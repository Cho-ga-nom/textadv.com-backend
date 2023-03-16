import { IsEmail, IsString } from 'class-validator';

export class CreatePlayerrDTO {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}