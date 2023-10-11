import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  id: string;

  @IsString()
  password: string;
}