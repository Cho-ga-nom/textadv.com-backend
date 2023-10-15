import { IsNumber, IsString } from 'class-validator';

export class UpdateTestOptionDTO {

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

  @IsString()
  readonly nextNormalPassage: string;
}