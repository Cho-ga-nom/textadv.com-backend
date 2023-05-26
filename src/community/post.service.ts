import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { MessageService } from 'src/message/message.service';
import { UpdatePostDTO } from './dto/update-post-dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private readonly messageService: MessageService,
    ) {}

    private readonly logger = new Logger(PostService.name);

  async createPost(createPostDTO: CreatePostDTO): Promise<any> {
    try {
      const post = new Post();

      post.writer = createPostDTO.writer;
      post.title = createPostDTO.title;
      post.content = createPostDTO.content;

      await this.postRepo.insert(post);
      return this.messageService.postingSuccess();
    } catch (err) {
      return this.messageService.postingFail();
    }
  }

  async getPostList(): Promise<Post[]> {
    const post = await this.postRepo.find({
      take: 30,
      order: { createdAt: "ASC" },
    });

    if(!post) {
      throw new NotFoundException('Post not exist any more');
    }
    
    return post;
  }

  // 게시물 리스트를 보낼 때 사용
  async getPostByWriter(writer: string): Promise<Post[]> {
    const posts = await this.postRepo.createQueryBuilder("post")
    .where("post.writer like :writer", { writer: `%${ writer }%`})
    .getMany();

    if(!posts) {
      throw new NotFoundException('Post not exist');
    }

    return posts;
  }

  // 게시물 리스트를 보낼 때 사용
  async getPostByTitleContent(input: string): Promise<Post[]> {
    const posts = await this.postRepo.createQueryBuilder("post")
    .where("post.title like :title", { title: `%${ input }%`})
    .orWhere("post.content like :content", { content: `%${ input }%`})
    .getMany();

    if(!posts) {
      throw new NotFoundException('Post not exist');
    }

    return posts;
  }

  async getPostByCategory(category: number): Promise<Post[]> {
    const posts = await this.postRepo.find({
      where: { category },
    });

    if(!posts) {
      throw new NotFoundException('Post not exist');
    }

    return posts;
  }

  async updatePost(updatePostDTO: UpdatePostDTO): Promise<any> {
    const post_id = updatePostDTO.post_id;
    
    try {
      await this.postRepo.update(post_id, { 
        title: updatePostDTO.title,
        content: updatePostDTO.content,
      });

      return this.messageService.postUpdateSuccess();
    } catch(err) {
      return this.messageService.postUpdateFail();
    };
  }

  // 좋아요 업데이트 함수 만들어야 함
  // 유저가 좋아요을 누를 때마다 호출하면 비효율적
  // redis를 이용하거나, 프론트에서 좋아요, 싫어요 누적값을 일정 시간마다 보내는 방식으로 해야할듯

  async deletePost(post_id: number): Promise<any> {
    const result = await this.postRepo.delete(post_id);

    if(result.affected == 0) {
      return this.messageService.postDeleteFail();
    }

    return this.messageService.postDeleteSuccess();
  }
}
