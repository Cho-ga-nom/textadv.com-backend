import { IsNumber, IsString } from 'class-validator';

export class PasswordCheckDTO {
  
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly password: string;
}