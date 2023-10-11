import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class UpdateStoryDTO {
  
  @IsNumber()
  readonly difficulty: number;

  @IsString()
  readonly name: string;

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