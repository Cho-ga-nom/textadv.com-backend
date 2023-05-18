import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { MessageService } from 'src/message/message.service';
import { UpdatePostDTO } from './dto/update-post-dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  
    private readonly messageService: MessageService,
    ) {}

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

  async updatePost(updatePostDTO: UpdatePostDTO): Promise<any> {
    const post_id = updatePostDTO.post_id;
    
    await this.postRepo.update(post_id, { 
      title: updatePostDTO.title,
      content: updatePostDTO.content,
    })
    .then(() => {
      return this.messageService.postUpdateSuccess();
    })
    .catch(() => {
      return this.messageService.postUpdateFail();
    });
  }
}
