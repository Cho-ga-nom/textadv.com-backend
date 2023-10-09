import { IsString, IsNumber } from 'class-validator';

export class GetPassagePkDTO {

  @IsNumber()
  readonly storyId: number;

  @IsString()
  readonly passageName: string;
}