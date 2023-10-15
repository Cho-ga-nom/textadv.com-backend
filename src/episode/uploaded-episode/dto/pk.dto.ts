import { IsString } from 'class-validator';

export class PkDTO {

  @IsString()
  readonly pk: string;
}