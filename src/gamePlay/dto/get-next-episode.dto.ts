import { IsNumber, IsArray } from 'class-validator';

export class GetNextEpisodeDTO {
  
  @IsNumber()
  readonly currentHealth: number;

  @IsArray()
  readonly lastStoryArr?: string[];
}