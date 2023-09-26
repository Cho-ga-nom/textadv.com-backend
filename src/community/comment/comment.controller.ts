import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { UpdateCommentDTO } from '../dto/update-comment.dto';
import { DeleteCommentDTO } from '../dto/delete-comment.dto';
import { UpdateCommentLikeDTO } from '../dto/update-comment-like-dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  private readonly logger = new Logger(CommentController.name);

  @Post('create')
  async createComment(@Body() createCommentDTO: CreateCommentDTO) {
    return this.commentService.createComment(createCommentDTO);
  }

  @Get('search_by_post_id/:post_id')
  async getCommentById(@Param('post_id') post_id: number) {
    return this.commentService.getCommentByPostId(post_id);
  }

  @Get('get_comment_count/:post_id')
  async getCommentCount(@Param('post_id') post_id: number) {
    return this.commentService.getCommentCount(post_id);
  }

  @Patch('update')
  async updateComment(@Body() updateCommentDTO: UpdateCommentDTO) {
    return this.commentService.updateComment(updateCommentDTO);
  }

  @Patch('update_like')
  async updateLike(@Body() updateCommentLikeDTO: UpdateCommentLikeDTO) {
    return this.commentService.updateLike(updateCommentLikeDTO);
  }

  @Delete('delete')
  async deleteComment(@Body() deleteCommentDTO: DeleteCommentDTO) {
    return this.commentService.deleteComment(deleteCommentDTO);
  }
}