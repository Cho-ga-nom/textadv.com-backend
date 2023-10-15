import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/test-story.entity';
import { Passage } from '../entities/test-passage.entity';
import { TestOption } from '../entities/test-option.entity';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class UploadedEpisodeService {
  constructor(
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    @InjectRepository(Passage) private passageRepo: Repository<Passage>,
    @InjectRepository(TestOption) private optionRepo: Repository<TestOption>,
    private readonly messageService: MessageService,
  ) {}

  private readonly logger = new Logger(UploadedEpisodeService.name);

  async getStoryListByTime(genre: number): Promise<any> {
    const storyList = await this.storyRepo.find({
      select: {
        pk: true,
        genre: true,
        level: true,
        name: true,
        userNickname: true,
        like: true,
        dislike: true,
        lastUpdate: true,
      },
      where: { genre: genre },
      order: { lastUpdate: "DESC" },
      take: 10,
    });

    if(storyList.length == 0) {
      let empty = [];
      return empty;
    }

    return storyList;
  }

  async getPassageList(storyPk: string): Promise<any> {
    const passageList = await this.passageRepo.find({
      select: {
        pk: true,
        name: true,
        visibleText: true,
      },
      where: {
        storyPk: storyPk,
        passageType: 'normalPassage',
      }
    });

    if(passageList.length == 0) {
      let empty = [];
      return empty;
    }

    return passageList;
  }

  async getOptionList(passagePk: string): Promise<any> {
    const optionList = await this.optionRepo.find({
      select: {
        optionVisibleName: true,
        afterStory: true,
        status1: true,
        status1Num: true,
        status2: true,
        status2Num: true,
        nextNormalPassage: true,
      },
      where: {
        normalPassagePk: passagePk
      }
    });

    if(optionList.length == 0) {
      let empty = [];
      return empty;
    }

    return optionList;
  }
}