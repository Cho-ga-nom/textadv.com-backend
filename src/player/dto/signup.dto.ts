import { IsEmail, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}