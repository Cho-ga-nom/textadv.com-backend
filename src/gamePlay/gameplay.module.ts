import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Option } from 'src/episode/entities/option.entity';
import { GamePlayController } from './gameplay.controller';
import { GamePlayService } from './gameplay.service';
import { MainEpisode } from 'src/episode/entities/main-episode.entity';
import { MainEpisodeOption } from 'src/episode/entities/main-episode-option.entity';
import { UploadOption } from 'src/episode/entities/upload-option.entity';
import { UploadStory } from 'src/episode/entities/upload-story.entity';
import { UploadPassage } from 'src/episode/entities/upload-passage.entity';
import { MessageService } from 'src/message/message.service';
import { EpisodeLike } from 'src/episode/entities/episode-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Option, Character, MainEpisode, MainEpisodeOption, UploadStory, UploadPassage, UploadOption, EpisodeLike])],
  controllers: [GamePlayController],
  providers: [GamePlayService, MessageService],
})

export class GamePlayModule {}