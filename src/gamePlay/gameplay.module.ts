import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayController } from './gameplay.controller';
import { GamePlayService } from './gameplay.service';
import { UploadOption } from 'src/episode/entities/upload-option.entity';
import { UploadStory } from 'src/episode/entities/upload-story.entity';
import { UploadPassage } from 'src/episode/entities/upload-passage.entity';
import { MessageService } from 'src/message/message.service';
import { EpisodeLike } from 'src/episode/entities/episode-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadStory, UploadPassage, UploadOption, EpisodeLike])],
  controllers: [GamePlayController],
  providers: [GamePlayService, MessageService],
})

export class GamePlayModule {}