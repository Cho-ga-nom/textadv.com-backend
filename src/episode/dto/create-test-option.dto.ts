import { IsNumber, IsString, Validate } from 'class-validator';
import { Passage } from '../entities/test-passage.entity';

export class CreateTestOptionDTO {

  @IsString()
  readonly pk: string;

  @Validate(Passage)
  readonly normalPassagePk: Passage;

  @IsString()
  readonly name: string;

  @IsString()
  readonly optionVisibleName: string;

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

  readonly nextNormalPassages?: string[];
}