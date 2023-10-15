import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/test-story.entity';
import { Passage } from '../entities/test-passage.entity';
import { TestOption } from '../entities/test-option.entity';
import { MessageService } from 'src/message/message.service';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { PkDTO } from '../uploaded-episode/dto/pk.dto';

@Injectable()
export class MyEpisodeService {
  constructor(
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    @InjectRepository(Passage) private passageRepo: Repository<Passage>,
    @InjectRepository(TestOption) private optionRepo: Repository<TestOption>,
    private readonly messageService: MessageService,
  ) {}

  private readonly logger = new Logger(MyEpisodeService.name);

  async getStoryList(nicknameDTO: NicknameDTO): Promise<any> {
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
      where: {
        userNickname: nicknameDTO.nickname
      }
    });

    if(storyList.length == 0) {
      let empty = [];
      return empty;
    }

    return storyList;
  }

  async getPassageList(pkDTO: PkDTO): Promise<any> {
    const passageList = await this.passageRepo.find({
      relations: { storyPk: true },
      select: {
        pk: true,
        name: true,
        visibleText: true,
        storyPk: { pk: false },
      },
      where: {
        storyPk: pkDTO.pk,
        passageType: 'normalPassage',
      }
    });

    if(passageList.length == 0) {
      let empty = [];
      return empty;
    }

    return passageList;
  }

  async getOptionList(pkDTO: PkDTO): Promise<any> {
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
        normalPassagePk: pkDTO.pk
      }
    });

    if(optionList.length == 0) {
      let empty = [];
      return empty;
    }

    return optionList;
  }
}