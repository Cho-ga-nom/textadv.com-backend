import { Controller, Body, Post, Get, Patch, Param, Logger, Delete, UseGuards } from '@nestjs/common';
import { MyEpisodeService } from './my-episode.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('my_episode')
export class MyEpisodeController {
  constructor(private readonly myEpisodeService: MyEpisodeService) {}
  private readonly logger = new Logger(MyEpisodeController.name);

  //@UseGuards(JwtAuthGuard)
  @Get('get_story_list')
  async getStoryList() {

  }

  @Get('get_passage_list/:story_id')
  async getPassageList(@Param('story_id') storyId: string) {

  }

  @Get('get_option_list/:passage_id')
  async getOptionList(@Param('passage_id') passageId: string) {
    
  }
}