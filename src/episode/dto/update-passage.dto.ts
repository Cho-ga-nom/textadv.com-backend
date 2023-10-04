import { IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

export class UpdatePassageDTO {

  @IsString()
  readonly name: string;

  @IsString()
  readonly passageType: string;

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