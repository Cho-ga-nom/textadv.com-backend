import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/test-story.entity';
import { Passage } from './entities/test-passage.entity';
import { TestOption } from './entities/test-option.entity';
import { MyEpisodeController } from './my-episode/my-episode.controller';
import { MyEpisodeService } from './my-episode/my-episode.service';
import { MessageService } from 'src/message/message.service';
import { MakeEpisodeController } from './make/make-episode.controller';
import { MakeEpisodeService } from './make/make-episode.service';
import { MainStory } from './entities/test-main-story.entity';
import { MainPassage } from './entities/test-main-passage.entity';
import { MainOption } from './entities/test-main-option.entity';
import { UploadedEpisodeController } from './uploaded-episode/uploaded-episode.controller';
import { UploadedEpisodeService } from './uploaded-episode/uploaded-episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Passage, TestOption, MainStory, MainPassage, MainOption])],
  controllers: [MyEpisodeController, MakeEpisodeController, UploadedEpisodeController],
  providers: [MyEpisodeService, MakeEpisodeService, UploadedEpisodeService, MessageService],
})
export class EpisodeModule {}
