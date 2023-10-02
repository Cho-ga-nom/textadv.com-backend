import { IsNumber, IsString, IsBoolean, Validate } from 'class-validator';
import { Story } from '../entities/test-story.entity';

export class CreatePassageDTO {

  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly passageType: string;

  @Validate(Story)
  readonly story: Story;

  @IsString()
  readonly text: string;

  @IsString()
  readonly text_user: string;

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