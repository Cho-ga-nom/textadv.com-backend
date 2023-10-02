import { IsNumber, IsString } from 'class-validator';

export class PlayerPostDTO {

  @IsString()
  readonly player_id: string;

  @IsNumber()
  readonly post_id: number;
}