import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/test-story.entity';
import { Passage } from '../entities/test-passage.entity';
import { TestOption } from '../entities/test-option.entity';
import { CreateStoryDTO } from './dto/create-story.dto';
import { CreatePassageDTO } from './dto/create-passage.dto';
import { CreateTestOptionDTO } from './dto/create-test-option.dto';
import { GetPassageDTO } from './dto/get-passage.dto';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { UpdateStoryDTO } from './dto/update-story.dto';
import { UpdatePassageDTO } from './dto/update-passage.dto';
import { UpdateTestOptionDTO } from './dto/update-test-option.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class MakeEpisodeService {
  constructor(
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    @InjectRepository(Passage) private passageRepo: Repository<Passage>,
    @InjectRepository(TestOption) private optionRepo: Repository<TestOption>,
    private readonly messageService: MessageService,
  ) {}

  private readonly logger = new Logger(MakeEpisodeService.name);

  async createStory(createStoryDTO: CreateStoryDTO): Promise<any> {
    try {
      const story = new Story();
      
      story.pk = createStoryDTO.pk;
      story.ifid = createStoryDTO.ifid;
      story.id = createStoryDTO.id;
      story.level = createStoryDTO.level;
      story.name = createStoryDTO.name;
      story.userNickname = createStoryDTO.userNickname;
      story.startPassage = createStoryDTO.startPassage;
      story.script = createStoryDTO.script;
      story.selected = createStoryDTO.selected;
      story.snapToGrid = createStoryDTO.snapToGrid;
      story.storyFormat = createStoryDTO.storyFormat;
      story.storyFormatVersion = createStoryDTO.storyFormatVersion;
      story.zoom = createStoryDTO.zoom
      
      await this.storyRepo.insert(story);
      return;
    } catch (err) {
      return err
    }
  }

  async createPassage(createPassageDTO: CreatePassageDTO): Promise<any> {
    try {
      const passage = new Passage();

      passage.pk = createPassageDTO.pk;
      passage.id = createPassageDTO.id;
      passage.storyPk = createPassageDTO.storyPk;
      passage.story = createPassageDTO.story;
      passage.passageType = createPassageDTO.passageType;
      passage.parentOfOption = createPassageDTO.parentOfOption;
      passage.name = createPassageDTO.name;
      passage.optionVisibleName = createPassageDTO.optionVisibleName;
      passage.text = createPassageDTO.text;
      passage.visibleText = createPassageDTO.visibleText;
      passage.height = createPassageDTO.height;
      passage.highlighted = createPassageDTO.highlighted;
      passage.left = createPassageDTO.left;
      passage.selected = createPassageDTO.selected;
      passage.top = createPassageDTO.top;
      passage.width = createPassageDTO.width;
      
      await this.passageRepo.insert(passage);
      return;
    } catch (err) {
      return err
    }
  }

  async createOption(createTestOptionDTO: CreateTestOptionDTO): Promise<any> {
    try {
      const option = new TestOption();

      option.pk = createTestOptionDTO.pk;
      option.normalPassagePk = createTestOptionDTO.normalPassagePk;
      option.name = createTestOptionDTO.name;
      option.optionVisibleName = createTestOptionDTO.optionVisibleName;
      option.afterStory = createTestOptionDTO.afterStory;
      option.status1 = createTestOptionDTO.status1;
      option.status1Num = createTestOptionDTO.status1Num;
      option.status2 = createTestOptionDTO.status2;
      option.status2Num = createTestOptionDTO.status2Num;
      option.nextNormalPassage = createTestOptionDTO.nextNormalPassage;

      await this.optionRepo.insert(option);
      return;
    }
    catch (err) {
      return err;
    }
  }

  async getStory(nicknameDTO: NicknameDTO): Promise<Story[]> {
    const stories = await this.storyRepo.find({
      where: { userNickname: nicknameDTO.nickname }
    });

    if(stories.length === 0) {
      let emptyStory: Story[] = [];
      return emptyStory;
    }

    return stories;
  }

  async getPassage(getPassageDTO: GetPassageDTO): Promise<any> {
    const passages = await this.passageRepo.find({
      relations: { storyPk: true },
      where: {
        storyPk: { pk: getPassageDTO.episodePk }
      }
    });
    
    if(passages.length === 0) {
      const emptyPassages = [];
      return emptyPassages;
    }

    let passageList = [];
    for(let i = 0; i < passages.length; i++) {
      const { storyPk, ...result } = passages[i];
      passageList.push(result);
    }

    return passageList;
  }

  async getOption(getPassageDTO: GetPassageDTO): Promise<TestOption[]> {
    const options = await this.optionRepo.find({
      relations: { normalPassagePk: true },
      where: {
        normalPassagePk: { pk: getPassageDTO.episodePk }
      }
    });

    if(options.length === 0) {
      let emptyOptions: TestOption[] = [];
      return emptyOptions;  
    }

    return options;
  }

  async updateStory(storyId: string, updateStoryDTO: UpdateStoryDTO): Promise<any> {
    return await this.storyRepo.createQueryBuilder()
    .update(Story)
    .set(
      {
        level: updateStoryDTO.level,
        name: updateStoryDTO.name,
        startPassage: updateStoryDTO.startPassage,
        script: updateStoryDTO.script,
        selected: updateStoryDTO.selected,
        snapToGrid: updateStoryDTO.snapToGrid,
        storyFormat: updateStoryDTO.storyFormat,
        storyFormatVersion: updateStoryDTO.storyFormatVersion,
        zoom: updateStoryDTO.zoom,
      }
    )
    .where("pk = :story_id", { story_id: storyId })
    .execute()
    .then(() => {
      return;
    })
    .catch((err) => {
      this.logger.error(err);
      return this.messageService.deleteFail();
    });
  }
  
  async updatePassage(passageId: string, updatePassageDTO: UpdatePassageDTO): Promise<any> {
    return await this.passageRepo.createQueryBuilder()
    .update(Passage)
    .set(
      {
        parentOfOption: updatePassageDTO.parentOfOption,
        name: updatePassageDTO.name,
        optionVisibleName: updatePassageDTO.optionVisibleName,
        text: updatePassageDTO.text,
        visibleText: updatePassageDTO.visibleText,
        height: updatePassageDTO.height,
        highlighted: updatePassageDTO.highlighted,
        left: updatePassageDTO.left,
        selected: updatePassageDTO.selected,
        top: updatePassageDTO.top,
        width: updatePassageDTO.width,
      }
    )
      .where("pk = :passage_id", { passage_id: passageId })
      .execute()
      .then(() => {
        return;
      })
      .catch((err) => {
        this.logger.error(err);
        return err;
    });
  }

  async updateOption(optionId: string, updateTestOptionDTO: UpdateTestOptionDTO): Promise<any> {
    return await this.optionRepo.createQueryBuilder()
    .update(TestOption)
    .set(
      {
        name: updateTestOptionDTO.name,
        optionVisibleName: updateTestOptionDTO.optionVisibleName,
        afterStory: updateTestOptionDTO.afterStory,
        status1: updateTestOptionDTO.status1,
        status1Num: updateTestOptionDTO.status1Num,
        status2: updateTestOptionDTO.status2,
        status2Num: updateTestOptionDTO.status2Num,
        nextNormalPassage: updateTestOptionDTO.nextNormalPassage,
      }
    )
    .where("pk = :option_id", { option_id: optionId })
    .execute()
    .then(() => {
      return { msg: 'success', successMsg: 'Success Update Option' };
    })
    .catch((err) => {
      this.logger.error(err);
      return err;
    })
  }

  async deleteStory(storyId: string): Promise<any> {
    const result = await this.storyRepo.delete(storyId);

    if(result.affected == 0) {
      return this.messageService.deleteFail();
    }

    return this.messageService.deleteSuccess();
  }

  async deletePassage(passageId: string): Promise<any> {
    const result = await this.passageRepo.delete(passageId);

    if(result.affected == 0) {
      return this.messageService.deleteFail();
    }

    return this.messageService.deleteSuccess();
  }

  async deleteOption(optionId: string): Promise<any> {
    const result = await this.optionRepo.delete(optionId);

    if(result.affected == 0) {
      return this.messageService.deleteFail();
    }

    return this.messageService.deleteSuccess();
  }
}