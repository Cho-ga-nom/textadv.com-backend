import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/test-story.entity';
import { Passage } from '../entities/test-passage.entity';
import { TestOption } from '../entities/test-option.entity';
import { MessageService } from 'src/message/message.service';
import { GetStoryListDTO } from './dto/get-storylist.dto';

@Injectable()
export class MyEpisodeService {
  constructor(
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    @InjectRepository(Passage) private passageRepo: Repository<Passage>,
    @InjectRepository(TestOption) private optionRepo: Repository<TestOption>,
    private readonly messageService: MessageService,
  ) {}

  private readonly logger = new Logger(MyEpisodeService.name);

  async getStoryList(getStoryListDTO: GetStoryListDTO): Promise<any> {
    const storyList = await this.storyRepo.find({
      select: {
        pk: true,
        genre: true,
        difficulty: true,
        name: true,
        writer: true,
        like: true,
        dislike: true,
        lastUpdate: true,
      },
      where: {
        writer: getStoryListDTO.nickname
      }
    });

    if(storyList.length == 0) {
      return false;
    }

    return storyList;
  }

  async getPassageList(storyId: number): Promise<any> {
    const passageList = await this.passageRepo.find({
      select: {
        pk: true,
        name: true,
        visibleText: true,
      },
      where: {
        storyPk: storyId,
        passageType: 'normalPassage',
      }
    });

    if(passageList.length == 0) {
      return false;
    }

    return passageList;
  }

  async getOptionList(passageId: number): Promise<any> {
    const optionList = await this.optionRepo.find({
      select: {
        optionVisibleName: true,
        afterStory: true,
        status1: true,
        status1Num: true,
        status2: true,
        status2Num: true,
        nextPassage: true,
      },
      where: {
        normalPassageId: passageId
      }
    });

    if(optionList.length == 0) {
      return false;
    }

    return optionList;
  }
}