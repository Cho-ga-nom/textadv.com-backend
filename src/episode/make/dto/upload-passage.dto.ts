import { IsNumber, IsString, IsBoolean, Validate } from 'class-validator';
import { UploadStory } from 'src/episode/entities/upload-story.entity';

export class UploadPassageDTO {

  @IsString()
  readonly pk: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly passageType: string;

  @Validate(UploadStory)
  readonly storyPk: UploadStory;

  @IsString()
  readonly story: string

  @IsString()
  readonly parentOfOption: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly optionVisibleName: string;

  @IsString()
  readonly text: string;

  @IsString()
  readonly visibleText: string;

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