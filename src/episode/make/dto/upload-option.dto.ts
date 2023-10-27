import { IsNumber, IsString, Validate } from 'class-validator';
import { UploadPassage } from 'src/episode/entities/upload-passage.entity';

export class UploadOptionDTO {

  @IsString()
  readonly pk: string;

  @Validate(UploadPassage)
  readonly normalPassagePk: UploadPassage;

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
  readonly nextNormalPassage?: string;
}