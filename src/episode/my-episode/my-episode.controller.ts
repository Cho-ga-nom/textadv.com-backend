import { Controller, Get, Post, Delete, Param, Body, Logger, UseGuards, Req } from '@nestjs/common';
import { MyEpisodeService } from './my-episode.service';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { JwtRefreshGuard } from 'src/auth/guards/jwt-refresh.guard';

@Controller('my_episode')
export class MyEpisodeController {
  constructor(private readonly myEpisodeService: MyEpisodeService) {}
  private readonly logger = new Logger(MyEpisodeController.name);

  @Post('get_story_list')
  async getStoryList(@Body() nicknameDTO: NicknameDTO) {
    return await this.myEpisodeService.getStoryList(nicknameDTO);
  }

  @Get('get_passage_list/:story_pk')
  async getPassageList(@Param('story_pk') storyPk: string) {
    return await this.myEpisodeService.getPassageList(storyPk);
  }

  @Get('get_option_list/:passage_pk')
  async getOptionList(@Param('passage_pk') passagePk: string) {
    return await this.myEpisodeService.getOptionList(passagePk);
  }

  @UseGuards(JwtRefreshGuard)
  @Delete('delete_upload_story/:story_pk')
  async deleteUploadStory(@Param('story_pk') storyPk: string, @Req() req) {
    if(req === null || req === false) {
      return await null;
    }

    return await this.myEpisodeService.deleteUploadStory(storyPk);
  }
}