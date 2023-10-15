import { IsNumber, IsString, Validate } from 'class-validator';
import { MainEpisode } from '../entities/main-episode.entity';

export class CreateMainEpisodeOptionDTO {

  @Validate(MainEpisode)
  readonly episode: MainEpisode;

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