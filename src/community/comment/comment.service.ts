import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDTO } from '../dto/update-comment.dto';
import { DeleteCommentDTO } from '../dto/delete-comment.dto';
import { UpdateCommentLikeDTO } from '../dto/update-comment-like-dto';

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

  async updateComment(updateCommentDTO: UpdateCommentDTO): Promise<any> {
    const comment_id = updateCommentDTO.comment_id;
    const comment = await this.getCommentByCommentId(comment_id);

    if(!comment) {
      return this.messageService.commentUpdateFail();
    }

    if(await bcrypt.compare(updateCommentDTO.password, comment.password)) {
      await this.commentRepo.update(comment_id, {
        comment: updateCommentDTO.comment,
      });

      return this.messageService.commentUpdateSuccess();
    }
    else {
      return this.messageService.wrongPassword();
    }
  }

  async updateLike(updateCommentLikeDTO: UpdateCommentLikeDTO): Promise<any> {
    const comment_id = updateCommentLikeDTO.comment_id;
    const updated_like = updateCommentLikeDTO.like_count + 1;

    try {
      await this.commentRepo.update(comment_id, {
        like: updated_like,
      });

      return this.messageService.likeUpdateSuccess();
    } catch (err) {
      this.logger.error(err);
      return this.messageService.likeUpdateFail();
    };
  }

  async deleteComment(deleteCommentDTO: DeleteCommentDTO): Promise<any> {
    const comment_id = deleteCommentDTO.comment_id;
    const comment = await this.getCommentByCommentId(comment_id);

    if(!comment) {
      return this.messageService.commentDeleteFail();
    }

    if(await bcrypt.compare(deleteCommentDTO.password, comment.password)) {
      const result = await this.commentRepo.delete(comment_id);
      
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