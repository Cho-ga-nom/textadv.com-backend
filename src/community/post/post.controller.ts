import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post-dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  @Post('create')
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }

  @Get('getPostList/:post_id')
  async getPostList(@Param('post_id') postId: number) {
    return await this.postService.getPostList(postId);
  }

  @Get('search_by_id/:post_id')
  async getPostById(@Param('post_id') postId: number) {
    return await this.postService.getPostById(postId);
  }

  @Get('search_by_writer/:writer')
  async getPostByWriter(@Param('writer') writer: string) {
    return await this.postService.getPostByWriter(writer);
  }

  @Get('search_by_title_content/:input')
  async getPostByTitleContent(@Param('input') input: string) {
    return await this.postService.getPostByTitleContent(input);
  }

  @Get('search_by_category/:category')
  async getPostByCategory(@Param('category') category: string) {
    return await this.postService.getPostByCategory(category);
  }
  
  @Patch('update')
  async updatePost(@Body() updatePostDTO: UpdatePostDTO) {
    return await this.postService.updatePost(updatePostDTO);
  }

  @Delete('delete/:post_id')
  async deletePost(@Param('post_id') post_id: number) {
    return this.postService.deletePost(post_id);
  }
}
