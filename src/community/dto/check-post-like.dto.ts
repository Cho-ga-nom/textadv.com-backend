import { IsString, IsNumber } from 'class-validator';

export class CheckPostLikeDTO {

  @IsString()
  readonly player_id: string;

  @IsNumber()
  readonly post_id: number;
}