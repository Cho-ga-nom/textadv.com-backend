import { Controller, Get, Param, Post, Body, Patch, Logger, Delete } from '@nestjs/common';
import { ChangeStatusDTO } from 'src/character/dto/statusChange.dto';
import { CreateEpisodeDTO } from 'src/episode/dto/create-episode.dto';
import { CreateOptionDTO } from 'src/episode/dto/create-option.dto';
import { GamePlayService } from './gameplay.service';
import { Episode } from 'src/episode/entities/episode.entity';
import { CreateMainEpisodeDTO } from 'src/episode/dto/create-main-episode.dto';
import { CreateMainEpisodeOptionDTO } from 'src/episode/dto/create-main-episode-option.dto';
import { CreateStoryDTO } from 'src/episode/dto/create-story.dto';
import { CreatePassageDTO } from 'src/episode/dto/create-passage.dto';
import { UpdateStoryDTO } from 'src/episode/dto/update-story.dto';
import { UpdatePassageDTO } from 'src/episode/dto/update-passage.dto';
import { CreateTestOptionDTO } from 'src/episode/dto/create-test-option.dto';
import { UpdateTestOptionDTO } from 'src/episode/dto/update-test-option.dto';

@Controller('game_play')
export class GamePlayController {
  constructor(private readonly gamePlayService: GamePlayService) {}

  private readonly logger = new Logger(GamePlayService.name);

  @Get('episode/:id')
  async getEpisode(@Param('id') episodeId: number) {
    const Episode_Text = await this.gamePlayService.getEpisodeById(episodeId);
    const Option_Texts = await this.gamePlayService.getOptionTexts(episodeId);
    const Option_Stat_Changes = await this.gamePlayService.getOptionStatChanges(episodeId);
    
    return { Episode_Text, Option_Texts, Option_Stat_Changes };
  }

  @Get('character/:id')
  getCharacter(@Param('id') episodeId: number) {
    return this.gamePlayService.getCharacter(episodeId);
  }

  // 메인 에피소드와 선택지를 모두 가져옴
  @Get('mainepisode')
  async getMainEpisode() {
    return await this.gamePlayService.getMainEpisode();
  }

  @Get('get_stoires/:user_id')
  async getStories(@Param('user_id') userId: string) {
    return await this.gamePlayService.getStory();
  }

  @Get('get_passages')
  async getPassages() {
    return await this.gamePlayService.getPassage();
  }

  @Get('get_options')
  async getOptions() {
    return await this.gamePlayService.getOption();
  }

  @Post()
  async createEpisode(@Body() createEpisodeDTO: CreateEpisodeDTO) {
    return await this.gamePlayService.createEpisode(createEpisodeDTO);
  }

  @Post('create_story')
  async createStory(@Body() createStoryDTO: CreateStoryDTO) {
    return await this.gamePlayService.createStory(createStoryDTO);
  }

  @Post('create_passage')
  async createPassage(@Body() createPassageDTO: CreatePassageDTO) {
    return await this.gamePlayService.createPassage(createPassageDTO);
  }

  @Post('create_option')
  async createTestOption(@Body() createtestOptionDTO: CreateTestOptionDTO) {
    return await this.gamePlayService.createTestOption(createtestOptionDTO);
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

  @Patch('update_story/:story_id')
  async updateStory(@Param('story_id') storyId: string,
  @Body() updateStoryDTO: UpdateStoryDTO) {
    return await this.gamePlayService.updateStory(storyId, updateStoryDTO);
  }

  @Patch('update_passage/:passage_id')
  async updatePassage(@Param('passage_id') passageId: string,
  @Body() updatePassageDTO: UpdatePassageDTO) {
    return await this.gamePlayService.updatePassage(passageId, updatePassageDTO);
  }

  @Patch('update_option/:option_id')
  async updateOption(@Param('option_id') optionId: string,
  @Body() updateTestOptionDTO: UpdateTestOptionDTO) {
    return await this.gamePlayService.updateOption(optionId, updateTestOptionDTO);
  }

  @Delete('delete_story/:story_id')
  async deleteStory(@Param('story_id') storyId: string) {
    return await this.gamePlayService.deleteStory(storyId);
  }

  @Delete('delete_passage/:passage_id')
  async deletePassage(@Param('passage_id') passageId: string) {
    return await this.gamePlayService.deletePassage(passageId);
  }

  @Delete('delete_option/:option_id')
  async deleteOption(@Param('option_id') optionId: string) {
    return await this.gamePlayService.deleteOption(optionId);
  }
}