import { IsString } from 'class-validator';

export class UpdateCommentDTO {

  @IsString()
  readonly writer: string;

  @IsString()
  readonly comment: string;
}