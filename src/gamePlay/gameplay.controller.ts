import { Controller, Get, Param, Post, Render, Body } from '@nestjs/common';
import { CharacterDTO } from 'src/character/dto/character.dto';
import { CreateEpisodeDTO } from 'src/episode/dto/create-episode.dto';
import { CreateOptionsDTO } from 'src/episode/dto/create-options.dto';
import { GamePlayService } from './gameplay.service';


@Controller('game_play')
export class GamePlayController {
  constructor(private readonly gamePlayService: GamePlayService) {}
  
  @Get()
  @Render('game_play')
  root() {}

  @Get(':id')
  getOne(@Param('id') episodeId: number) {
    return this.gamePlayService.getEpisodeById(episodeId);
  }

  @Post()
  async createEpisode(@Body() createEpisodeDTO: CreateEpisodeDTO) {
    return await this.gamePlayService.createEpisode(createEpisodeDTO);
  }

  @Post('option')
  async createOption(@Body() createOptionsDTO: CreateOptionsDTO) {
    return await this.gamePlayService.createOptions(createOptionsDTO);
  }

  @Post('character')
  async createCharacter(@Body() characterDTO: CharacterDTO) {
    return await this.gamePlayService.createCharacter(characterDTO);
  }
}