import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateStoryDTO {
  
  @IsString()
  readonly id: string;

  @IsString()
  readonly ifid: string;

  @IsNumber()
  readonly difficulty: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly writer: string;

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