import { Controller, Body, Post, Patch } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post-dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return await this.postService.createPost(createPostDTO);
  }

  @Patch('update')
  async updatePost(@Body() updatePostDTO: UpdatePostDTO) {
    return await this.postService.updatePost(updatePostDTO);
  }
}
