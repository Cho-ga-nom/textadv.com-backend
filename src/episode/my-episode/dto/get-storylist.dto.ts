import { IsString } from 'class-validator';

export class GetStoryListDTO {

  @IsString()
  readonly nickname: string;
}