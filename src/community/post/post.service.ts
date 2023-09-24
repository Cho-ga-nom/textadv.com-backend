import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository, LessThanOrEqual } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreatePostDTO } from '../dto/create-post.dto';
import { MessageService } from 'src/message/message.service';
import { UpdatePostDTO } from '../dto/update-post-dto';
import { UpdatePostLikeDTO } from '../dto/update-post-like.dto';
import { DeletePostDTO } from '../dto/delete-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly messageService: MessageService,
    ) {}

  private readonly logger = new Logger(PostService.name);

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<any> {
    try {
      const post = new Post();

      post.writer = createPostDTO.writer;
      post.password = await this.hashPassword(createPostDTO.password);
      post.title = createPostDTO.title;
      post.content = createPostDTO.content;
      post.category = createPostDTO.category;

      await this.postRepo.insert(post);
      return this.messageService.postingSuccess();
    } catch (err) {
      return this.messageService.postingFail();
    }
  }

  async getLastPost(): Promise<number> {
    const post = await this.postRepo.createQueryBuilder("post")
    .select("MAX(post.createdAt)")
    .addSelect("post.post_id")
    .groupBy("post.post_id")
    .getOne();

    const lastId = post.post_id;

    return lastId;
  }

  async getPage(pageNum: number): Promise<any> {
    const temp = await this.getLastPost();
    const start = temp - ((pageNum - 1) * 20);

    const posts = await this.postRepo.find({
      where: {
        post_id: LessThanOrEqual(start)
      },
      take: 20,
      order: {
        post_id: "DESC"
      }
    });

    let boardInfo = [];
    for(let i = 0; i < posts.length; i++) {
      const { password, content, ...result } = posts[i];
      boardInfo.push(result);
    }

    return boardInfo;
  }

  // async getPostList(postId: number): Promise<Post[]> {
  //   const posts = await this.postRepo.createQueryBuilder("post")
  //   .select("post.post_id")
  //   .addSelect("post.writer")
  //   .addSelect("post.title")
  //   .addSelect("post.createdAt")
  //   .addSelect("post.view")
  //   .addSelect("post.like")
  //   .addSelect("post.category")
  //   .where("post.post_id < :post_id", { post_id: postId })
  //   .limit(20)
  //   .orderBy("post.post_id", "DESC")
  //   .getMany();

  //   if(posts.length == 0) {
  //     let notExit: Post[];
  //     return notExit;
  //   }

  //   return posts;
  // }

  async getPostCount(): Promise<any> {
    const count = await this.postRepo.createQueryBuilder("post")
    .getCount();

    if(!count) {
      throw new NotFoundException('Post not exist');
    }

    return count;
  }

  async getPostById(postId: number): Promise<Post> {
    const post = await this.postRepo.createQueryBuilder("post")
    .where("post.post_id = :post_id", { post_id: postId })
    .getOne();

    if(!post) {
      throw new NotFoundException('Post not exist');
    }

    return post;
  }

  async getPostByWriter(writer: string): Promise<Post[]> {
    const posts = await this.postRepo.createQueryBuilder("post")
    .where("post.writer like :writer", { writer: `%${ writer }%`})
    .getMany();

    if(!posts) {
      throw new NotFoundException('Post not exist');
    }

    return posts;
  }

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
    const posts = await this.postRepo.createQueryBuilder("post")
    .select("post.post_id")
    .addSelect("post.writer")
    .addSelect("post.title")
    .addSelect("post.createdAt")
    .addSelect("post.view")
    .addSelect("post.like")
    .addSelect("post.category")
    .where("post.category = :category", { category: category })
    .limit(20)
    .orderBy("post.post_id", "DESC")
    .getMany();

    if(!posts) {
      throw new NotFoundException('Post not exist');
    }

    return posts;
  }

  async getPostCountByCategory(category: number): Promise<any> {
    const count = await this.postRepo.createQueryBuilder("post")
    .where("post.category > :category", { category: category })
    .getCount();

    if(count) {
      throw new NotFoundException('Post not exist');
    }

    return count;
  }

  async getPopularPost(postId: number): Promise<Post[]> {
    const posts = await this.postRepo.createQueryBuilder("post")
    .select("post.post_id")
    .addSelect("post.writer")
    .addSelect("post.title")
    .addSelect("post.createdAt")
    .addSelect("post.view")
    .addSelect("post.like")
    .addSelect("post.category")
    .where("post.like > :like", { like: 4 })
    .andWhere("post.post_id < :post_id", { post_id: postId })
    .limit(20)
    .orderBy("post.post_id", "DESC")
    .getMany();

    if(!posts) {
      throw new NotFoundException('Not exist post anymore');
    }

    return posts;
  }

  async getPopularPostCount(): Promise<any> {
    const count = await this.postRepo.createQueryBuilder("post")
    .where("post.like> :like", { like: 4 })
    .getCount();

    if(count) {
      throw new NotFoundException('Post not exist');
    }

    return count;
  }

  async updatePost(updatePostDTO: UpdatePostDTO): Promise<any> {
    const post_id = updatePostDTO.post_id;
    const post = await this.getPostById(post_id);

    if(!post) {
      return this.messageService.postUpdateFail();
    }

    if(await bcrypt.compare(updatePostDTO.password, post.password)) {
      await this.postRepo.update(post_id, { 
        title: updatePostDTO.title,
        content: updatePostDTO.content,
      });

      return this.messageService.postUpdateSuccess();
    }
    else {
      return this.messageService.wrongPassword();
    }
  }
  
  // 추천을 누른 유저의 정보를 db 혹은 쿠키에 저장해야 함.
  async updateLike(updatePostLikeDTO: UpdatePostLikeDTO): Promise<any> {
    const post_id = updatePostLikeDTO.post_id;
    const updated_like = updatePostLikeDTO.like_count + 1;

    try {
      await this.postRepo.update(post_id, {
        like: updated_like,
      });

      return  this.messageService.likeUpdateSuccess();
    } catch(err) {
      return this.messageService.likeUpdateFail();
    };
  }

  async deletePost(deletePostDTO: DeletePostDTO): Promise<any> {
    const post_id = deletePostDTO.post_id;
    const post = await this.getPostById(post_id);

    if(!post) {
      return this.messageService.postDeleteFail();
    }

    if(await bcrypt.compare(deletePostDTO.password, post.password)) {
      const result = await this.postRepo.delete(post_id);

      if(result.affected == 0) {
        return this.messageService.postDeleteFail();
      }

      return this.messageService.postDeleteSuccess();
    }
    else {
      return this.messageService.wrongPassword();
    }
  }
}