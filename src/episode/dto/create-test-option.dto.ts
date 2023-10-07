import { IsNumber, IsString, IsBoolean, Validate } from 'class-validator';
import { Passage } from '../entities/test-passage.entity';

export class CreateTestOptionDTO {

  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly passageType: string;

  @IsString()
  readonly story: string;

  @Validate(Passage)
  readonly passage: Passage;

  @IsString()
  readonly text: string;
  
  @IsString()
  readonly text_user: string;
  
  @IsString()
  readonly after_story: string;

  @IsString()
  readonly status1: string;

  @IsNumber()
  readonly status1_num: number;

  @IsString()
  readonly status2: string;

  @IsNumber()
  readonly status2_num: number;

  @IsNumber()
  readonly height: number;

  @IsBoolean()
  readonly highlighted: boolean;

  @IsNumber()
  readonly left: number;

  @IsBoolean()
  readonly selected: boolean;

  @IsNumber()
  readonly top: number;

  @IsNumber()
  readonly width: number;
}