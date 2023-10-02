import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDTO } from '../dto/update-comment.dto';
import { PasswordCheckDTO } from '../dto/password-check.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private readonly messageService: MessageService,
  ) {}

  private readonly logger = new Logger(CommentService.name);

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createComment(createCommentDTO: CreateCommentDTO): Promise<any> {
    try {
      const comment = new Comment;

      comment.post_id = createCommentDTO.post_id;
      comment.writer = createCommentDTO.writer;
      comment.password = await this.hashPassword(createCommentDTO.password);
      comment.comment = createCommentDTO.comment;

      await this.commentRepo.insert(comment);
      return this.messageService.commentSuccess();
    } catch (err) {
      return this.messageService.commentFail();
    }
  }

  async getCommentByPostId(post_id: number): Promise<Comment[]> {
    const comments = await this.commentRepo.find({
      where: { post_id },
      order: { createdAt: "DESC" },
    });

    if(comments.length == 0) {
      let notExit: Comment[];
      return notExit;
    }

    return comments;
  }

  async getCommentCount(postId: number): Promise<any> {
    const count = await this.commentRepo.createQueryBuilder("comment")
    .where("comment.post_id = :post_id", { post_id: postId })
    .getCount();

    if(count == null) {
      throw new NotFoundException('Server Error');
    }

    return count;
  }

  async getCommentByCommentId(commentId: number): Promise<Comment> {
    const comment = await this.commentRepo.createQueryBuilder("comment")
    .where("comment.comment_id = :comment_id", { comment_id: commentId })
    .getOne();

    if(!comment) {
      throw new NotFoundException('Comment not exist');
    }

    return comment;
  }

  async comparePassword(passwordCheckDTO: PasswordCheckDTO): Promise<boolean> {
    const comment = await this.getCommentByCommentId(passwordCheckDTO.id);
    if(!comment) {
      return false;
    }

    if(await bcrypt.compare(passwordCheckDTO.password, comment.password)) {
      return true;
    }
    else {
      return false;
    }
  }

  async updateComment(updateCommentDTO: UpdateCommentDTO): Promise<any> {
    try {
      await this.commentRepo.update(updateCommentDTO.comment_id, {
        comment: updateCommentDTO.comment,
      });

      return;
    }
    catch(err) {
      return this.messageService.updateFail();
    }
  }

  async deleteComment(deleteDTO: PasswordCheckDTO): Promise<any> {
    if(await this.comparePassword(deleteDTO)) {
      const result = await this.commentRepo.delete(deleteDTO.id);
  
      if(result.affected == 0) {
        return this.messageService.commentDeleteFail();
      }

      return this.messageService.commentDeleteSuccess();
    }
    else {
      return this.messageService.wrongPassword();
    }
  }
}