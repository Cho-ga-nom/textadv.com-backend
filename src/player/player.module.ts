import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { MessageModule } from 'src/message/message.module';
import { TestPlayer } from './entities/test-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestPlayer]), MessageModule],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
