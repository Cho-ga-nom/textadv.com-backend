import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateStoryDTO {
  
  @IsString()
  readonly pk: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly ifid: string;

  @IsNumber()
  readonly level: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly userNickname: string;

  @IsString()
  readonly startPassage: string;

  @IsString()
  readonly script: string;

  @IsBoolean()
  readonly selected: boolean;

  @IsBoolean()
  readonly snapToGrid: boolean;

  @IsString()
  readonly storyFormat: string;

  @IsString()
  readonly storyFormatVersion: string;

  @IsNumber()
  readonly zoom: number;
}