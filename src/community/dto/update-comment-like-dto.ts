import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentLikeDTO {

  @IsString()
  readonly user_id: string;

  @IsNumber()
  readonly comment_id: number;

  @IsNumber()
  readonly like_count: number;
}