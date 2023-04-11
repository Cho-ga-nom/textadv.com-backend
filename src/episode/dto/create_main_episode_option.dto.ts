import { IsNumber, IsString, Validate } from 'class-validator';
import { MainEpisode } from '../entities/main_episode.entity';

export class CreateMainEpisodeOptionDTO {

  @Validate(MainEpisode)
  readonly episode: MainEpisode;

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