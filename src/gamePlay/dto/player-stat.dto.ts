import { IsNumber } from 'class-validator';

export class PlayerStatDTO {

  @IsNumber()
  readonly health: number;

  @IsNumber()
  readonly satiety: number;

  @IsNumber()
  readonly money: number;
}