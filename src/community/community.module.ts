import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { MessageModule } from 'src/message/message.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment]),
    MessageModule,
  ],
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService],
})
export class CommunityModule {}
