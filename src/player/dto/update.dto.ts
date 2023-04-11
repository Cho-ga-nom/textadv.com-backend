import { IsString } from 'class-validator';

export class UpdatePlayerDTO {
  @IsString()
  nickname: string;

  @IsString()
  password: string;
}