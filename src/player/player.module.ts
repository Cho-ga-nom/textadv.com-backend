import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { MessageModule } from 'src/message/message.module';
import { TestPlayer } from './entities/test-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, TestPlayer]), MessageModule],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
