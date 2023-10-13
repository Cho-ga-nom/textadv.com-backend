import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class GetPassageDTO {

  @IsString()
  readonly pk: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly passageType: string;

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