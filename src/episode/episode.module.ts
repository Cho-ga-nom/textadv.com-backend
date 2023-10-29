import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/test-story.entity';
import { Passage } from './entities/test-passage.entity';
import { Option } from './entities/test-option.entity';
import { MyEpisodeController } from './my-episode/my-episode.controller';
import { MyEpisodeService } from './my-episode/my-episode.service';
import { MessageService } from 'src/message/message.service';
import { MakeEpisodeController } from './make/make-episode.controller';
import { MakeEpisodeService } from './make/make-episode.service';
import { UploadedEpisodeController } from './uploaded-episode/uploaded-episode.controller';
import { UploadedEpisodeService } from './uploaded-episode/uploaded-episode.service';
import { EpisodeLike } from './entities/episode-like.entity';
import { UploadStory } from './entities/upload-story.entity';
import { UploadPassage } from './entities/upload-passage.entity';
import { UploadOption } from './entities/upload-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Passage, Option, EpisodeLike, UploadStory, UploadPassage, UploadOption])],
  controllers: [MyEpisodeController, MakeEpisodeController, UploadedEpisodeController],
  providers: [MyEpisodeService, MakeEpisodeService, UploadedEpisodeService, MessageService],
})
export class EpisodeModule {}
