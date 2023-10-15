import { Controller, Get, Param, Logger } from '@nestjs/common';
import { UploadedEpisodeService } from './uploaded-episode.service';

@Controller('uploaded_episode')
export class UploadedEpisodeController {
  constructor(private readonly uploadedEpisodeService: UploadedEpisodeService) {}
  private readonly logger = new Logger(UploadedEpisodeController.name);

  // 최신순
  @Get('get_story_list/:genre')
  async getStoryList(@Param('genre') genre: number) {
    return await this.uploadedEpisodeService.getStoryListByTime(genre);
  }

  // 추천순
  // @Get('get_story_list_by_like/:genre')
  // async getStoryListByLike(@Body() nicknameDTO: NicknameDTO, @Param('genre') genre: number) {

  // }

  @Get('get_story/:story_pk')
  async getStoryByPk(@Param('story_pk') storyPk: string) {
    return await this.uploadedEpisodeService.getStoryByPk(storyPk);
  }

  @Get('get_passage_list/:story_pk')
  async getPassageList(@Param('story_pk') storyPk: string) {
    return await this.uploadedEpisodeService.getPassageList(storyPk);
  }

  @Get('get_option_list/:passage_pk')
  async getOptionList(@Param('passage_pk') passagePk: string) {
    return await this.uploadedEpisodeService.getOptionList(passagePk);
  }
}