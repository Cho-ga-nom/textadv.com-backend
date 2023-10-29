import { Controller, Get, Param, Post, Body, Patch, Logger } from '@nestjs/common';
import { GamePlayService } from './gameplay.service';
import { GetNextEpisodeDTO } from './dto/get-next-episode.dto';
import { PlayerEpisodeDTO } from './dto/player-episode.dto';

@Controller('game_play')
export class GamePlayController {
  constructor(private readonly gamePlayService: GamePlayService) {}

  private readonly logger = new Logger(GamePlayService.name);

  @Post('get_next_episode')
  async getNextEpisode(@Body() getNextEpisodeDTO: GetNextEpisodeDTO) {
    return await this.gamePlayService.getNextStoryAndPassage(getNextEpisodeDTO);
  }

  @Patch('update_like')
  async updateLike(@Body() playerEpisodeDTO: PlayerEpisodeDTO) {
    return await this.gamePlayService.updateLike(playerEpisodeDTO);
  }

  @Patch('update_dislike')
  async updateDislike(@Body() playerEpisodeDTO: PlayerEpisodeDTO) {
    return await this.gamePlayService.updateDislike(playerEpisodeDTO);
  }
}