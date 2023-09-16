import { IsNumber, IsString } from 'class-validator';

export class DeleteCommentDTO {
  
  @IsNumber()
  readonly comment_id: number;

  @IsString()
  readonly password: string;
}