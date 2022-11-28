import { IsNumber, Validate } from 'class-validator';
import { Episode } from 'src/episode/entities/episode.entity';

export class CharacterDTO {

  @Validate(Episode)
  readonly episode: Episode;
  
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