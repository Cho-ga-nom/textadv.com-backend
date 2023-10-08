import { IsNumber, IsString, IsBoolean, Validate } from 'class-validator';
import { Passage } from '../entities/test-passage.entity';

export class CreateTestOptionDTO {

  @Validate(Passage)
  readonly passage: Passage;

  @IsString()
  readonly name: string;

  @IsString()
  readonly visibleName: string;

  @IsString()
  readonly afterStory: string;

  @IsString()
  readonly status1: string;

  @IsNumber()
  readonly status1Num: number;

  @IsString()
  readonly status2: string;

  @IsNumber()
  readonly status2Num: number;

  @IsString()
  readonly nextPassage: string;
}