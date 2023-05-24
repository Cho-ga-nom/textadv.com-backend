import { IsString, Validate } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreateCommentDTO {

  @Validate(Post)
  readonly post_id: Post;

  @IsString()
  readonly writer: string;

  @IsString()
  readonly comment: string;
}