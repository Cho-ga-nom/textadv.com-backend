import { IsNumber, IsString, Validate } from 'class-validator';
import { MainEpisodeOption } from '../entities/main-episode-option.entity';

export class CreateMainEpisodeDTO {

  @IsNumber()
  readonly mode: number;

  @IsString()
  readonly title: string;
  
  @IsString()
  readonly main_text: string;

  @Validate(MainEpisodeOption)
  readonly options: MainEpisodeOption;
}