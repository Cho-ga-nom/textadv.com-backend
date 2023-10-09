import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/test-story.entity';
import { Passage } from './entities/test-passage.entity';
import { TestOption } from './entities/test-option.entity';
import { MyEpisodeController } from './my-episode/my-episode.controller';
import { MyEpisodeService } from './my-episode/my-episode.service';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Passage, TestOption])],
  controllers: [MyEpisodeController],
  providers: [MyEpisodeService, MessageService],
})
export class EpisodeModule {}
