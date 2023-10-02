import { IsNumber, IsString } from 'class-validator';

export class PostLikeDTO {

  @IsString()
  readonly player_id: string;

  @IsNumber()
  readonly post_id: number;
}