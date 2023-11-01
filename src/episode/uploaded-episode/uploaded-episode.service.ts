import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageService } from 'src/message/message.service';
import { UploadStory } from '../entities/upload-story.entity';
import { UploadPassage } from '../entities/upload-passage.entity';
import { UploadOption } from '../entities/upload-option.entity';

@Injectable()
export class UploadedEpisodeService {
  constructor(
    @InjectRepository(UploadStory) private storyRepo: Repository<UploadStory>,
    @InjectRepository(UploadPassage) private passageRepo: Repository<UploadPassage>,
    @InjectRepository(UploadOption) private optionRepo: Repository<UploadOption>,
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
        startPassage: true,
        like: true,
        dislike: true,
        lastUpdate: true,
      },
      where: { genre: genre },
      order: { createdAt: "DESC" },
      take: 10,
    });

    if(storyList.length === 0) {
      let empty = [];
      return empty;
    }

    return storyList;
  }

  async getStoryByPk(storyPk: string): Promise<any> {
    const story = await this.storyRepo.findOne({
      select: {
        pk: true,
        genre: true,
        level: true,
        name: true,
        userNickname: true,
        startPassage: true,
        like: true,
        dislike: true,
        lastUpdate: true,
      },
      where: { pk: storyPk }
    });

    if(story === undefined) {
      return null;
    }

    return story;
  }

  async getPassageList(storyPk: string): Promise<any> {
    const passageList = await this.passageRepo.find({
      relations: { storyPk: true },
      select: {
        pk: true,
        id: true,
        name: true,
        visibleText: true,
        storyPk: { pk: false }
      },
      where: {
        storyPk: { pk: storyPk },
        passageType: 'normalPassage',
      },
      order: { createdAt: "ASC" }
    });

    if(passageList.length === 0) {
      let empty = [];
      return empty;
    }

    return passageList;
  }

  async getOptionList(passagePk: string): Promise<any> {
    const optionList = await this.optionRepo.find({
      relations: { normalPassagePk: true },
      select: {
        optionVisibleName: true,
        afterStory: true,
        status1: true,
        status1Num: true,
        status2: true,
        status2Num: true,
        nextNormalPassage: true,
        normalPassagePk: { pk: false }
      },
      where: {
        normalPassagePk: { pk: passagePk }
      },
      order: { createdAt: "ASC" }
    });

    if(optionList.length === 0) {
      let empty = [];
      return empty;
    }

    return optionList;
  }
}