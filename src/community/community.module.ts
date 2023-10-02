import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { MessageModule } from 'src/message/message.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { PostLike } from './entities/post-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, PostLike]),
    MessageModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService],
})
export class CommunityModule {}
