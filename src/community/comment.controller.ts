import { Controller, Body, Post, Get, Patch, Param, Logger } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
    private readonly logger = new Logger(CommentController.name);

  @Post('create')
  async createComment(@Body() createCommentDTO: CreateCommentDTO) {
    return
  }

  @Patch('update')
  async updateComment(@Body() updateCommentDTO: UpdateCommentDTO) {
    return
  }
}