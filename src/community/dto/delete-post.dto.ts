import { IsNumber, IsString } from 'class-validator';

export class DeletePostDTO {

  @IsNumber()
  readonly post_id: number;

  @IsString()
  readonly password: string;
}