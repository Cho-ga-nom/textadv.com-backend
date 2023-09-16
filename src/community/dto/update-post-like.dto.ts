import { IsNumber, IsString } from 'class-validator';

export class UpdatePostLikeDTO {

  @IsString()
  readonly user_id: string;

  @IsNumber()
  readonly post_id: number;

  @IsNumber()
  readonly like_count: number;
}