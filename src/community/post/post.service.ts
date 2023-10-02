import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, LessThan, MoreThan, ILike, Brackets, Not } from 'typeorm';
import { PostLike } from '../entities/post-like.entity';
import { Post } from '../entities/post.entity';
import * as bcrypt from 'bcrypt';
import { CreatePostDTO } from '../dto/create-post.dto';
import { MessageService } from 'src/message/message.service';
import { UpdatePostDTO } from '../dto/update-post-dto';
import { DeletePostDTO } from '../dto/delete-post.dto';
import { BoardPost } from '../type/board-post';
import { PostLikeDTO } from '../dto/post-like.dto';
import { CheckPostLikeDTO } from '../dto/check-post-like.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(PostLike) private postLikeRepo: Repository<PostLike>,
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
    const post = await this.postRepo.findOne({
      where: { post_id: Not(0) },
      order: { post_id: "DESC" }
    });

    const lastId = post.post_id;
    return lastId;
  }

  async getPostList(pageNum: number): Promise<BoardPost[]> {
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

    let boardInfo: BoardPost[] = [];
    if(posts.length == 0) {
      return boardInfo;
    }

    for(let i = 0; i < posts.length; i++) {
      const { password, content, ...result } = posts[i];
      boardInfo.push(result);
    }

    return boardInfo;
  }

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

  async getPostByWriter(writer: string, pageNum: number): Promise<BoardPost[]> {
    const temp = await this.getLastPost();
    const start = temp - ((pageNum - 1) * 20);

    const posts = await this.postRepo.find({
      where: {
        writer: ILike(`%${ writer }%`),
        post_id: LessThanOrEqual(start)
      },
      take: 20,
      order: {
        post_id: "DESC"
      }
    });

    let boardInfo: BoardPost[] = [];
    if(posts.length == 0) {
      return boardInfo;
    }

    for(let i = 0; i < posts.length; i++) {
      const { password, content, ...result } = posts[i];
      boardInfo.push(result);
    }

    return boardInfo;
  }

  async getPostByTitleContent(input: string, pageNum: number): Promise<BoardPost[]> {
    const temp = await this.getLastPost();
    const start = temp - ((pageNum - 1) * 20);
    
    const posts = await this.postRepo.createQueryBuilder("post")
    .where(new Brackets(qb => {
      qb.where("post.title like :title", { title: `%${ input }%`})
        .orWhere("post.content like :content", { content: `%${ input }%`})
    }))
    .andWhere("post.post_id <= :start", { start })
    .getMany();
    
    let boardInfo: BoardPost[] = [];
    if(posts.length == 0) {
      return boardInfo;
    }

    for(let i = 0; i < posts.length; i++) {
      const { password, content, ...result } = posts[i];
      boardInfo.push(result);
    }

    return boardInfo;
  }

  async getPostByCategory(category: number, pageNum: number): Promise<BoardPost[]> {
    const temp = await this.getLastPost();
    const start = temp - ((pageNum - 1) * 20);

    const posts = await this.postRepo.find({
      where: {
        category: category,
        post_id: LessThanOrEqual(start)
      },
      take: 20,
      order: {
        post_id: "DESC"
      }
    });

    let boardInfo: BoardPost[] = [];
    if(posts.length == 0) {
      return boardInfo;
    }

    for(let i = 0; i < posts.length; i++) {
      const { password, content, ...result } = posts[i];
      boardInfo.push(result);
    }

    return boardInfo;
  }

  async getPostCountByCategory(category: number): Promise<any> {
    const count = await this.postRepo.createQueryBuilder("post")
    .where("post.category = :category", { category: category })
    .getCount();

    if(!count) {
      throw new NotFoundException('Post not exist');
    }

    return count;
  }

  async getPopularPost(pageNum: number): Promise<BoardPost[]> {
    const temp = await this.getLastPost();
    const start = temp - ((pageNum - 1) * 20);

    const posts = await this.postRepo.find({
      where: {
        like: MoreThan(4),
        post_id: LessThanOrEqual(start)
      },
      take: 20,
      order: {
        post_id: "DESC"
      }
    });

    let boardInfo: BoardPost[] = [];
    if(posts.length == 0) {
      return boardInfo;
    }

    for(let i = 0; i < posts.length; i++) {
      const { password, content, ...result } = posts[i];
      boardInfo.push(result);
    }

    return boardInfo;
  }

  async getPopularPostCount(): Promise<any> {
    const count = await this.postRepo.createQueryBuilder("post")
    .where("post.like= :like", { like: 4 })
    .getCount();

    if(!count) {
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

  async checkLike(checkDTO: CheckPostLikeDTO): Promise<number | any> {
    const result = await this.postLikeRepo.findOne({
      relations: { 
        player: true,
        post: true,
      },
      where: {
        player: { id: checkDTO.player_id },
        post: { post_id: checkDTO.post_id },
      }
    });
    
    if(result == null) {
      return result;
    }
    else {
      return result.id;
    }
  }
  
  async updateLike(postLikeDTO: PostLikeDTO): Promise<any> {
    const checkDTO: CheckPostLikeDTO = {
      player_id: postLikeDTO.player_id,
      post_id: postLikeDTO.post_id,
    };
    const result  = await this.checkLike(checkDTO);
    
    // try-catch로 묶어야 함
    if(result == null) {
      const post = await this.postRepo.findOne({
        where: {
          post_id: postLikeDTO.post_id
        }
      });

      const updatedLike = post.like + 1;
      await this.postRepo.update(postLikeDTO.post_id, {
        like: updatedLike
      });

      const likeLog = new PostLike();
      likeLog.player = postLikeDTO.player_id;
      likeLog.post = postLikeDTO.post_id;
      await this.postLikeRepo.insert(likeLog);
    }
    else {
      return null;
    }
  }

  async findOldPostLike(currentTime: number): Promise<PostLike[]> {
    const now = new Date(currentTime);
    const result = await this.postLikeRepo.find({
      where: {
        createdAt: LessThan(now)
      }
    });

    return result;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async deleteOldPostLike(): Promise<any> {
    this.logger.debug('진입');
    const currentTime = new Date().getTime();
    const oldPostLikes = await this.findOldPostLike(currentTime);

    if(oldPostLikes.length == 0) {
      this.logger.debug('리턴');
      return;
    }

    for(const postLike of oldPostLikes) {
      const result = await this.postLikeRepo.delete(postLike.id);

      if(result.affected == 0) {
        return this.messageService.deleteFail();
      }
    }
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