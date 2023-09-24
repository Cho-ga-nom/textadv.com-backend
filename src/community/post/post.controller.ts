import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post-dto';
import { DeletePostDTO } from '../dto/delete-post.dto';
import { UpdatePostLikeDTO } from '../dto/update-post-like.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  @Post('create')
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    return this.postService.createPost(createPostDTO);
  }

  @Get('get_post_list/:page_num')
  async getPage(@Param('page_num') pageNum: number) {
    return this.postService.getPage(pageNum);
  }
  
  @Get('get_post_count')
  async getPostCount() {
    return await this.postService.getPostCount();
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
  async getPostByCategory(@Param('category') category: number) {
    return await this.postService.getPostByCategory(category);
  }

  @Get('get_count_by_category/:category')
  async getCountByCategory(@Param('category') category: number) {
    return await this.postService.getPostCountByCategory(category);
  }

  @Get('get_popular_post/:post_id')
  async getPopularPost(@Param('post_id') postId: number) {
    return await this.postService.getPopularPost(postId);
  }

  @Get('get_popular_post_count')
  async getPopularPostCount() {
    return await this.postService.getPopularPostCount();
  }
  
  @Patch('update')
  async updatePost(@Body() updatePostDTO: UpdatePostDTO) {
    return await this.postService.updatePost(updatePostDTO);
  }

  @Patch('update_like')
  async updateLike(@Body() updatePostLikeDTO: UpdatePostLikeDTO) {
    return await this.postService.updateLike(updatePostLikeDTO);
  }

  @Delete('delete')
  async deletePost(@Body() deletePostDTO: DeletePostDTO) {
    return this.postService.deletePost(deletePostDTO);
  }
}
