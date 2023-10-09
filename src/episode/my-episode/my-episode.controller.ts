import { Controller, Get, Param, Body, Logger } from '@nestjs/common';
import { MyEpisodeService } from './my-episode.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetStoryListDTO } from './dto/get-storylist.dto';

@Controller('my_episode')
export class MyEpisodeController {
  constructor(private readonly myEpisodeService: MyEpisodeService) {}
  private readonly logger = new Logger(MyEpisodeController.name);

  //@UseGuards(JwtAuthGuard)
  @Get('get_story_list')
  async getStoryList(@Body() getStoryListDTO: GetStoryListDTO) {
    return await this.myEpisodeService.getStoryList(getStoryListDTO);
  }

  @Get('get_passage_list/:story_id')
  async getPassageList(@Param('story_id') storyId: number) {
    return await this.myEpisodeService.getPassageList(storyId);
  }

  @Get('get_option_list/:passage_id')
  async getOptionList(@Param('passage_id') passageId: number) {
    return await this.myEpisodeService.getOptionList(passageId);
  }
}