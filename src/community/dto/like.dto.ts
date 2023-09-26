import { IsNumber, IsString } from 'class-validator';

export class LikeDTO {

  @IsString()
  readonly player_id: string;

  @IsNumber()
  readonly post_id: number;

  @IsNumber()
  readonly like_count: number;
}