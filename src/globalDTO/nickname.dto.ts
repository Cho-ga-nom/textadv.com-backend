import { IsString } from 'class-validator';

export class NicknameDTO {

  @IsString()
  readonly nickname: string;
}