import { Controller, Get, Param, Body, Logger } from '@nestjs/common';
import { UploadedEpisodeService } from './uploaded-episode.service';
import { PkDTO } from './dto/pk.dto';

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

  @Get('get_story')
  async getStoryByPk(@Body() pkDTO: PkDTO) {
    return await this.uploadedEpisodeService.getStoryByPk(pkDTO);
  }

  @Get('get_passage_list')
  async getPassageList(@Body() pkDTO: PkDTO) {
    return await this.uploadedEpisodeService.getPassageList(pkDTO);
  }

  @Get('get_option_list')
  async getOptionList(@Body() pkDTO: PkDTO) {
    return await this.uploadedEpisodeService.getOptionList(pkDTO);
  }
}