import { IsString } from 'class-validator';

export class PlayerEpisodeDTO {

  @IsString()
  readonly player_id: string;

  @IsString()
  readonly storyPk: string;
}