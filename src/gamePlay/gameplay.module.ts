import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Option } from 'src/episode/entities/option.entity';
import { GamePlayController } from './gameplay.controller';
import { GamePlayService } from './gameplay.service';
import { MainEpisode } from 'src/episode/entities/main-episode.entity';
import { MainEpisodeOption } from 'src/episode/entities/main-episode-option.entity';
import { Story } from 'src/episode/entities/test-story.entity';
import { Passage } from 'src/episode/entities/test-passage.entity';
import { MessageService } from 'src/message/message.service';
import { TestOption } from 'src/episode/entities/test-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Option, Character, MainEpisode, MainEpisodeOption, Story, Passage, TestOption])],
  controllers: [GamePlayController],
  providers: [GamePlayService, MessageService],
})

export class GamePlayModule {}