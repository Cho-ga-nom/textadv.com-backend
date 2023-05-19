import { IsNumber, IsString } from 'class-validator';

export class UpdatePostDTO {

  @IsNumber()
  readonly post_id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}