import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateStoryDTO {
  
  @IsString()
  readonly id: string;

  @IsString()
  readonly if_id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly start_passage: string;

  @IsString()
  readonly script: string;

  @IsBoolean()
  readonly selected: boolean;

  @IsBoolean()
  readonly snap_to_grid: boolean;

  @IsString()
  story_format: string;

  @IsString()
  story_format_version: string;

  @IsNumber()
  zoom: number;
}