import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Option } from 'src/episode/entities/option.entity';
import { GamePlayController } from './gameplay.controller';
import { GamePlayService } from './gameplay.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Option, Character])],
  controllers: [GamePlayController],
  providers: [GamePlayService],
})

export class GamePlayModule {}