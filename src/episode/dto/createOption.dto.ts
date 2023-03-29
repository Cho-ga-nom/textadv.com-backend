import { IsNumber, IsString, Validate } from 'class-validator';
import { Episode } from '../entities/episode.entity';

export class CreateOptionDTO {

  @Validate(Episode)
  readonly episode: Episode;

  @IsString()
  readonly text: string;

  @IsString()
  readonly result_text: string;

  @IsNumber()
  readonly health_change: number;

  @IsNumber()
  readonly money_change: number;

  @IsNumber()
  readonly hungry_change: number;

  @IsNumber()
  readonly strength_change: number;

  @IsNumber()
  readonly agility_change: number;

  @IsNumber()
  readonly armour_change: number;

  @IsNumber()
  readonly mental_change: number;
}