import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  id: string;

  @IsString()
  password: string;
}