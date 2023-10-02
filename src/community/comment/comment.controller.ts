import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { UpdateCommentDTO } from '../dto/update-comment.dto';
import { PasswordCheckDTO } from '../dto/password-check.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  private readonly logger = new Logger(CommentController.name);

  @Post('create')
  async createComment(@Body() createCommentDTO: CreateCommentDTO) {
    return await this.commentService.createComment(createCommentDTO);
  }

  @Get('search_by_post_id/:post_id')
  async getCommentById(@Param('post_id') post_id: number) {
    return await this.commentService.getCommentByPostId(post_id);
  }

  @Get('get_comment_count/:post_id')
  async getCommentCount(@Param('post_id') post_id: number) {
    return await this.commentService.getCommentCount(post_id);
  }

  @Get('password_check')
  async PasswordCheck(@Body() passwordCheckDTO: PasswordCheckDTO) {
    return await this.commentService.comparePassword(passwordCheckDTO);
  }

  @Patch('update')
  async updateComment(@Body() updateCommentDTO: UpdateCommentDTO) {
    return await this.commentService.updateComment(updateCommentDTO);
  }

  @Delete('delete/:comment_id')
  async deleteComment(@Param('comment_id') commentId: number) {
    return await this.commentService.deleteComment(commentId);
  }
}