import { IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsString()
  id: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}