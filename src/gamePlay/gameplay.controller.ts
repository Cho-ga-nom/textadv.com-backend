import { Controller, Get, Param, Post, Render, Body, Patch } from '@nestjs/common';
import { ChangeStatusDTO } from 'src/character/dto/statusChange.dto';
import { CreateEpisodeDTO } from 'src/episode/dto/create-episode.dto';
import { CreateOptionDTO } from 'src/episode/dto/create-option.dto';
import { GamePlayService } from './gameplay.service';
import { Episode } from 'src/episode/entities/episode.entity';
import { CreateMainEpisodeDTO } from 'src/episode/dto/create-main-episode.dto';
import { CreateMainEpisodeOptionDTO } from 'src/episode/dto/create-main-episode-option.dto';


@Controller('game_play')
export class GamePlayController {
  constructor(private readonly gamePlayService: GamePlayService) {}
  
  @Get()
  @Render('game_play')
  root() {}

  @Get('episode/:id')
  getEpisode(@Param('id') episodeId: number) {
    return this.gamePlayService.getEpisodeById(episodeId);
  }
  
  @Get('options/:id')
  getOptions(@Param('id') episodeId: number) {
    return this.gamePlayService.getOptions(episodeId);
  }

  @Get('character/:id')
  getCharacter(@Param('id') episodeId: number) {
    return this.gamePlayService.getCharacter(episodeId);
  }

  // 메인 에피소드와 선택지를 모두 가져옴
  @Get('mainepisode')
  async getMainEpisode() {
    const mainEpisode = await this.gamePlayService.getMainEpisode();
    const mainEpisodeOptions = await this.gamePlayService.getMainEpisodeOptions();
    
    return { mainEpisode, mainEpisodeOptions };
  }
  
  @Post()
  async createEpisode(@Body() createEpisodeDTO: CreateEpisodeDTO) {
    return await this.gamePlayService.createEpisode(createEpisodeDTO);
  }

  @Post('option')
  async createOption(@Body() createOptionsDTO: CreateOptionDTO) {
    return await this.gamePlayService.createOption(createOptionsDTO);
  }

  @Post('mainepisode')
  async createMainEpisode(@Body() createMainEpisodeDTO: CreateMainEpisodeDTO) {
    return await this.gamePlayService.createMainEpisode(createMainEpisodeDTO);
  }

  @Post('mainepisodeoption')
  async createMainEpisodeOption(@Body() createMainEpisodeOptionDTO: CreateMainEpisodeOptionDTO) {
    return await this.gamePlayService.createMainEpisodeOption(createMainEpisodeOptionDTO);
  }

  @Post('character/:id')
  async createCharacter(@Param('id') episodeId: Episode) {
    return await this.gamePlayService.createCharacter(episodeId);
  }

  @Patch('changestatus/:id')
  async changeStatus(@Param('id') episodeId: number,
  @Body() changeStatusDTO: ChangeStatusDTO) {
    return await this.gamePlayService.changeStatus(episodeId, changeStatusDTO);
  }
}