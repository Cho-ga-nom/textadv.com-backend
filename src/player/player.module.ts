import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), MessageModule],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
