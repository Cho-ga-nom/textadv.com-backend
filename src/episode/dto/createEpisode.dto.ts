import { IsNumber, IsString, Validate } from 'class-validator';
import { Options } from '../entities/option.entity';

export class CreateEpisodeDTO {

  @IsNumber()
  readonly genre: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly mainText: string;

  @Validate(Options)
  readonly options: Options;
}