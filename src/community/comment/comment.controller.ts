import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { UpdateCommentDTO } from '../dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
    private readonly logger = new Logger(CommentController.name);

  @Post('create')
  async createComment(@Body() createCommentDTO: CreateCommentDTO) {
    return this.commentService.createComment(createCommentDTO);
  }

  @Get('search_by_postid/:post_id')
  async getCommentById(@Param('post_id') post_id: number) {
    return this.commentService.getCommentByPostId(post_id);
  }

  @Get('search_by_writer/:writer')
  async getCommentByWriter(@Param('writer') writer: string) {
    return this.commentService.getCommentByWriter(writer);
  }

  @Patch('update')
  async updateComment(@Body() updateCommentDTO: UpdateCommentDTO) {
    return this.commentService.updateComment(updateCommentDTO);
  }

  @Delete('delete/:comment_id')
  async deleteComment(@Param('comment_id') comment_id: number) {
    return this.commentService.deleteComment(comment_id);
  }
}