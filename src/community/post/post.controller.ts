import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post-dto';
import { PlayerPostDTO } from '../dto/player-post.dto';
import { PasswordCheckDTO } from '../dto/password-check.dto';

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
    return this.postService.getPostList(pageNum);
  }
  
  @Get('get_post_count')
  async getPostCount() {
    return await this.postService.getPostCount();
  }

  @Get('search_by_id/:post_id')
  async getPostById(@Param('post_id') postId: number) {
    return await this.postService.getPostById(postId);
  }

  @Get('search_by_writer/:writer/:page_num')
  async getPostByWriter(@Param('writer') writer: string, @Param('page_num') pageNum: number) {
    return await this.postService.getPostByWriter(writer, pageNum);
  }

  @Get('search_by_title_content/:input/:page_num')
  async getPostByTitleContent(@Param('input') input: string, @Param('page_num') pageNum: number) {
    return await this.postService.getPostByTitleContent(input, pageNum);
  }

  @Get('search_by_category/:category/:page_num')
  async getPostByCategory(@Param('category') category: number, @Param('page_num') pageNum: number) {
    return await this.postService.getPostByCategory(category, pageNum);
  }

  @Get('get_count_by_category/:category')
  async getCountByCategory(@Param('category') category: number) {
    return await this.postService.getPostCountByCategory(category);
  }

  @Get('get_popular_post/:page_num')
  async getPopularPost(@Param('page_num') pageNum: number) {
    return await this.postService.getPopularPost(pageNum);
  }

  @Get('get_popular_post_count')
  async getPopularPostCount() {
    return await this.postService.getPopularPostCount();
  }

  @Post('check_password')
  async PasswordCheck(@Body() passwordCheckDTO: PasswordCheckDTO) {
    return await this.postService.comparePassword(passwordCheckDTO)
  }
  
  @Patch('update')
  async updatePost(@Body() updatePostDTO: UpdatePostDTO) {
    return await this.postService.updatePost(updatePostDTO);
  }

  @Get('update_view/:post_id')
  async updateCache(@Param('post_id') postId: number) {
    return this.postService.updateCache(postId);
  }

  @Patch('update_like')
  async updatePostLike(@Body() postLikeDTO: PlayerPostDTO) {
    return await this.postService.updateLike(postLikeDTO);
  }

  @Delete('delete')
  async deletePost(@Body() deleteDTO: PasswordCheckDTO) {
    return this.postService.deletePost(deleteDTO);
  }
}
