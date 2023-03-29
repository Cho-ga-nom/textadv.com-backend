import { IsNumber } from 'class-validator';

export class ChangeStatusDTO {
  
  @IsNumber()
  readonly changed_health: number;

  @IsNumber()
  readonly changed_money: number;
  
  @IsNumber()
  readonly changed_hungry: number;

  @IsNumber()
  readonly changed_strength: number;

  @IsNumber()
  readonly changed_agility: number;

  @IsNumber()
  readonly changed_armour: number;

  @IsNumber()
  readonly changed_mental: number;
}