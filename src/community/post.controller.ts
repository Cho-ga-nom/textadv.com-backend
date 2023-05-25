import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post-dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  @Post('create')
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }

  @Get('getPostList')
  async getPostList() {
    return await this.postService.getPostList();
  }

  @Get('search_by_writer/:writer')
  async getPostByWriter(@Param('writer') writer: string) {
    return await this.postService.getPostByWriter(writer);
  }

  @Get('search_by_title_content/:input')
  async getPostByTitleContent(@Param('input') input: string) {
    return await this.postService.getPostByTitleContent(input);
  }

  @Get('search_by_category/:category_num')
  async getPostByCategory(@Param('category_num') category_num: number) {
    return await this.postService.getPostByCategory(category_num);
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
