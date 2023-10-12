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

@Module({
  imports: [TypeOrmModule.forFeature([Story, Passage, TestOption])],
  controllers: [MyEpisodeController, MakeEpisodeController],
  providers: [MyEpisodeService, MakeEpisodeService, MessageService],
})
export class EpisodeModule {}
