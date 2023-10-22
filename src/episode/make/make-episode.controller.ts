import { Controller, Param, Post, Body, Patch, Logger, Delete } from '@nestjs/common';
import { MakeEpisodeService } from './make-episode.service';
import { CreateStoryDTO } from './dto/create-story.dto';
import { CreatePassageDTO } from './dto/create-passage.dto';
import { CreateTestOptionDTO } from './dto/create-test-option.dto';
import { UpdateStoryDTO } from './dto/update-story.dto';
import { UpdatePassageDTO } from './dto/update-passage.dto';
import { UpdateTestOptionDTO } from './dto/update-test-option.dto';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { GetPassageDTO } from './dto/get-passage.dto';
import { UploadPassageDTO } from './dto/upload-passage.dto';
import { UploadOptionDTO } from './dto/upload-option.dto';

@Controller('make_episode')
export class MakeEpisodeController {
  constructor(private readonly makeEpisodeService: MakeEpisodeService) {}

  private readonly logger = new Logger(MakeEpisodeController.name);

  @Post('create_story')
  async createStory(@Body() createStoryDTO: CreateStoryDTO) {
    return await this.makeEpisodeService.createStory(createStoryDTO);
  }

  @Post('create_passage')
  async createPassage(@Body() createPassageDTO: CreatePassageDTO) {
    return await this.makeEpisodeService.createPassage(createPassageDTO);
  }

  @Post('create_option')
  async createTestOption(@Body() createtestOptionDTO: CreateTestOptionDTO) {
    return await this.makeEpisodeService.createOption(createtestOptionDTO);
  }

  @Post('get_stoires')
  async getStories(@Body() nicknameDtO: NicknameDTO) {
    return await this.makeEpisodeService.getStory(nicknameDtO);
  }

  @Post('get_passages')
  async getPassages(@Body() getPassageDTO: GetPassageDTO) {
    return await this.makeEpisodeService.getPassage(getPassageDTO);
  }

  @Post('get_options')
  async getOptions(@Body() getPassageDTO: GetPassageDTO) {
    return await this.makeEpisodeService.getOption(getPassageDTO);
  }

  @Patch('update_story/:story_pk')
  async updateStory(@Param('story_pk') storyPk: string, updateStoryDTO: UpdateStoryDTO) {
    return await this.makeEpisodeService.updateStory(storyPk, updateStoryDTO);
  }

  @Patch('update_passage/:passage_pk')
  async updatePassage(@Param('passage_pk') passagePk: string, updatePassageDTO: UpdatePassageDTO) {
    return await this.makeEpisodeService.updatePassage(passagePk, updatePassageDTO);
  }

  @Patch('update_option/:option_pk')
  async updateOption(@Param('option_pk') optionPk: string, updateOptionDTO: UpdateTestOptionDTO) {
    return await this.makeEpisodeService.updateOption(optionPk, updateOptionDTO);
  }

  @Delete('delete_story/:story_id')
  async deleteStory(@Param('story_id') storyId: string) {
    return await this.makeEpisodeService.deleteStory(storyId);
  }

  @Delete('delete_passage/:passage_id')
  async deletePassage(@Param('passage_id') passageId: string) {
    return await this.makeEpisodeService.deletePassage(passageId);
  }

  @Delete('delete_option/:option_id')
  async deleteOption(@Param('option_id') optionId: string) {
    return await this.makeEpisodeService.deleteOption(optionId);
  }

  @Post('upload_story')
  async uploadStory(@Body() createStoryDTO: CreateStoryDTO) {
    return await this.makeEpisodeService.uploadStory(createStoryDTO);
  }

  @Post('upload_passage')
  async uploadPassage(@Body() uploadPassageDTO: UploadPassageDTO) {
    return await this.makeEpisodeService.uploadPassage(uploadPassageDTO);
  }

  @Post('upload_option')
  async uploadOption(@Body() uploadOptionDTO: UploadOptionDTO) {
    return await this.makeEpisodeService.uploadOption(uploadOptionDTO);
  }

  @Delete('delete_upload_story/:story_id')
  async deleteUploadStory(@Param('story_id') storyId: string) {
    return await this.makeEpisodeService.deleteUploadStory(storyId);
  }

  @Delete('delete_upload_passage/:passage_id')
  async deleteUploadPassage(@Param('passage_id') passageId: string) {
    return await this.makeEpisodeService.deleteUploadPassage(passageId);
  }

  @Delete('delete_upload_option/:option_id')
  async deleteUploadOption(@Param('option_id') optionId: string) {
    return await this.makeEpisodeService.deleteUploadOption(optionId);
  }
}