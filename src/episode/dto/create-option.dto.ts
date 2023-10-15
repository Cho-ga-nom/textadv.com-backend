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
  readonly health: number;

  @IsNumber()
  readonly money: number;

  @IsNumber()
  readonly hungry: number;

  @IsNumber()
  readonly strength: number;

  @IsNumber()
  readonly agility: number;

  @IsNumber()
  readonly armour: number;

  @IsNumber()
  readonly mental: number;
}