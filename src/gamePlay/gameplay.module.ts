import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Option } from 'src/episode/entities/option.entity';
import { GamePlayController } from './gameplay.controller';
import { GamePlayService } from './gameplay.service';
import { MainEpisode } from 'src/episode/entities/main-episode.entity';
import { MainEpisodeOption } from 'src/episode/entities/main-episode-option.entity';
import { HtmlEpisode } from 'src/player-episode/html-episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Option, Character, MainEpisode, MainEpisodeOption, HtmlEpisode])],
  controllers: [GamePlayController],
  providers: [GamePlayService],
})

export class GamePlayModule {}