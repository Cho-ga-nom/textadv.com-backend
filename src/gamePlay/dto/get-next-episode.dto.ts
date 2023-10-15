import { IsNumber, IsArray, Validate} from 'class-validator';
import { PlayerStatDTO } from './player-stat.dto';

export class GetNextEpisodeDTO {
  
  @IsNumber()
  readonly genre: number;

  @Validate(PlayerStatDTO)
  readonly currentStat: PlayerStatDTO;

  @IsArray()
  readonly lastStoryArr: string[];
}