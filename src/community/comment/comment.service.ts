import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDTO } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private readonly messageService: MessageService,
  ) {}

  private readonly logger = new Logger(CommentService.name);

  async createComment(createCommentDTO: CreateCommentDTO): Promise<any> {
    try {
      const comment = new Comment;

      comment.post_id = createCommentDTO.post_id;
      comment.writer = createCommentDTO.writer;
      comment.comment = createCommentDTO.comment;

      await this.commentRepo.insert(comment);
      return this.messageService.commentSuccess();
    } catch (err) {
      return this.messageService.commentFail();
    }
  }

  // 개수 제한 둬서 가져올지 한번에 전부 긁어올지 정해야 함
  // 댓글수 10개 이상인 경우가 많이 없을 것 같아서 전부 긁어와도 될듯
  async getCommentByPostId(post_id: number): Promise<Comment[]> {
    const comment = await this.commentRepo.find({
      where: { post_id },
      order: { createdAt: "DESC" },
    });

    return comment;
  }

  // 프론트에서 해당 댓글의 작성자만 댓글을 수정할 수 있도록 검사
  // 수정한 댓글의 id, 수정한 내용을 받아서 update
  async updateComment(updateCommentDTO: UpdateCommentDTO): Promise<any> {
    const comment_id = updateCommentDTO.comment_id;

    try {
      await this.commentRepo.update(comment_id, {
        comment: updateCommentDTO.comment,
      });

      return this.messageService.commentUpdateSuccess();
    } catch(err) {
      return this.messageService.commentUpdateFail();
    };
  }

  // 좋아요 업데이트 함수 만들어야 함
  // post 좋아요 기능과 같은 이유로 어떻게 만들기 고민 중

  async deleteComment(comment_id: number): Promise<any> {
    const result = await this.commentRepo.delete(comment_id);

    if(result.affected == 0) {
      return this.messageService.commentDeleteFail();
    }

    return this.messageService.commentDeleteSuccess();
  }
}