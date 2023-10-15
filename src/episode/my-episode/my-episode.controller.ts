import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { MyEpisodeService } from './my-episode.service';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { PkDTO } from '../uploaded-episode/dto/pk.dto';

@Controller('my_episode')
export class MyEpisodeController {
  constructor(private readonly myEpisodeService: MyEpisodeService) {}
  private readonly logger = new Logger(MyEpisodeController.name);

  @Post('get_story_list')
  async getStoryList(@Body() nicknameDTO: NicknameDTO) {
    return await this.myEpisodeService.getStoryList(nicknameDTO);
  }

  @Post('get_passage_list')
  async getPassageList(@Body() pkDTO: PkDTO) {
    return await this.myEpisodeService.getPassageList(pkDTO);
  }

  @Post('get_option_list')
  async getOptionList(@Body() pkDTO: PkDTO) {
    return await this.myEpisodeService.getOptionList(pkDTO);
  }
}