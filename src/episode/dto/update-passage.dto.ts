import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class UpdatePassageDTO {

  @IsString()
  readonly name: string;

  readonly text: string;

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