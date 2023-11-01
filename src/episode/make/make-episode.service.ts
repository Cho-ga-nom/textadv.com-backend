import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/test-story.entity';
import { Passage } from '../entities/test-passage.entity';
import { Option } from '../entities/test-option.entity';
import { CreateStoryDTO } from './dto/create-story.dto';
import { CreatePassageDTO } from './dto/create-passage.dto';
import { CreateTestOptionDTO } from './dto/create-test-option.dto';
import { GetPassageDTO } from './dto/get-passage.dto';
import { UpdateStoryDTO } from './dto/update-story.dto';
import { UpdatePassageDTO } from './dto/update-passage.dto';
import { UpdateTestOptionDTO } from './dto/update-test-option.dto';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { UploadStory } from '../entities/upload-story.entity';
import { UploadPassage } from '../entities/upload-passage.entity';
import { UploadOption } from '../entities/upload-option.entity';
import { UploadPassageDTO } from './dto/upload-passage.dto';
import { UploadOptionDTO } from './dto/upload-option.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class MakeEpisodeService {
  constructor(
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    @InjectRepository(Passage) private passageRepo: Repository<Passage>,
    @InjectRepository(Option) private optionRepo: Repository<Option>,
    @InjectRepository(UploadStory) private uploadStoryRepo: Repository<UploadStory>,
    @InjectRepository(UploadPassage) private uploadPassageRepo: Repository<UploadPassage>,
    @InjectRepository(UploadOption) private uploadOptionRepo: Repository<UploadOption>,
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
      const option = new Option();

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

  async checkStory(storyPk: string): Promise<boolean> {
    const check = await this.uploadStoryRepo.exist({
      where: { pk: storyPk }
    });

    return check;
  }

  async uploadStory(createStoryDTO: CreateStoryDTO): Promise<any> {
    if(await this.checkStory(createStoryDTO.pk)) {
      return await this.uploadStoryRepo.createQueryBuilder()
      .update(UploadStory)
      .set(
        {
          level: createStoryDTO.level,
          name: createStoryDTO.name,
          startPassage: createStoryDTO.startPassage,
          script: createStoryDTO.script,
          selected: createStoryDTO.selected,
          snapToGrid: createStoryDTO.snapToGrid,
          storyFormat: createStoryDTO.storyFormat,
          storyFormatVersion: createStoryDTO.storyFormatVersion,
          zoom: createStoryDTO.zoom,
        }
      )
      .where("pk = :story_pk", { story_pk: createStoryDTO.pk })
      .execute()
      .catch((err) => {
        return err;
      });
    }
    else {
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
        
        await this.uploadStoryRepo.insert(story);
        return;
      } catch (err) {
        return err
      }
    }
  }

  async checkPassage(passagePk: string): Promise<boolean> {
    const check = await this.uploadPassageRepo.exist({
      where: { pk: passagePk }
    });

    return check;
  }

  async uploadPassage(uploadPassageDTO: UploadPassageDTO): Promise<any> {
    if(await this.checkPassage(uploadPassageDTO.pk)) {
      return await this.uploadPassageRepo.createQueryBuilder()
      .update(UploadPassage)
      .set(
        {
          parentOfOption: uploadPassageDTO.parentOfOption,
          name: uploadPassageDTO.name,
          optionVisibleName: uploadPassageDTO.optionVisibleName,
          text: uploadPassageDTO.text,
          visibleText: uploadPassageDTO.visibleText,
          height: uploadPassageDTO.height,
          highlighted: uploadPassageDTO.highlighted,
          left: uploadPassageDTO.left,
          selected: uploadPassageDTO.selected,
          top: uploadPassageDTO.top,
          width: uploadPassageDTO.width,
        }
      )
      .where("pk = :passage_pk", { passage_pk: uploadPassageDTO.pk })
      .execute()
      .catch((err) => {
        return err;
      });
    }
    else {
      try {
        const passage = new UploadPassage();
  
        passage.pk = uploadPassageDTO.pk;
        passage.id = uploadPassageDTO.id;
        passage.storyPk = uploadPassageDTO.storyPk;
        passage.story = uploadPassageDTO.story;
        passage.passageType = uploadPassageDTO.passageType;
        passage.parentOfOption = uploadPassageDTO.parentOfOption;
        passage.name = uploadPassageDTO.name;
        passage.optionVisibleName = uploadPassageDTO.optionVisibleName;
        passage.text = uploadPassageDTO.text;
        passage.visibleText = uploadPassageDTO.visibleText;
        passage.height = uploadPassageDTO.height;
        passage.highlighted = uploadPassageDTO.highlighted;
        passage.left = uploadPassageDTO.left;
        passage.selected = uploadPassageDTO.selected;
        passage.top = uploadPassageDTO.top;
        passage.width = uploadPassageDTO.width;
        
        await this.uploadPassageRepo.insert(passage);
        return;
      } catch (err) {
        return err
      }
    }
  }

  async checkOption(optionPk: string): Promise<boolean> {
    const check = await this.uploadOptionRepo.exist({
      where: { pk: optionPk }
    });

    this.logger.debug(check);
    return check;
  }

  async uploadOption(uploadOptionDTO: UploadOptionDTO): Promise<any> {
    if(await this.checkOption(uploadOptionDTO.pk)) {
      this.logger.debug("선택지 업데이트");
      return await this.uploadOptionRepo.createQueryBuilder()
      .update(UploadOption)
      .set(
        {
          name: uploadOptionDTO.name,
          optionVisibleName: uploadOptionDTO.optionVisibleName,
          afterStory: uploadOptionDTO.afterStory,
          status1: uploadOptionDTO.status1,
          status1Num: uploadOptionDTO.status1Num,
          status2: uploadOptionDTO.status2,
          status2Num: uploadOptionDTO.status2Num,
          nextNormalPassage: uploadOptionDTO.nextNormalPassage,
        }
      )
      .where("pk = :option_pk", { option_pk: uploadOptionDTO.pk })
      .execute()
      .catch((err) => {
        return err;
      });
    }
    else {
      this.logger.debug("선택지 생성");
      try {
        const option = new UploadOption();
  
        option.pk = uploadOptionDTO.pk;
        option.normalPassagePk = uploadOptionDTO.normalPassagePk;
        option.name = uploadOptionDTO.name;
        option.optionVisibleName = uploadOptionDTO.optionVisibleName;
        option.afterStory = uploadOptionDTO.afterStory;
        option.status1 = uploadOptionDTO.status1;
        option.status1Num = uploadOptionDTO.status1Num;
        option.status2 = uploadOptionDTO.status2;
        option.status2Num = uploadOptionDTO.status2Num;
        option.nextNormalPassage = uploadOptionDTO.nextNormalPassage;
  
        await this.uploadOptionRepo.insert(option);
        return;
      }
      catch (err) {
        return err;
      }
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

  async getOption(getPassageDTO: GetPassageDTO): Promise<Option[]> {
    const options = await this.optionRepo.find({
      relations: { normalPassagePk: true },
      where: {
        normalPassagePk: { pk: getPassageDTO.episodePk }
      }
    });

    if(options.length === 0) {
      let emptyOptions: Option[] = [];
      return emptyOptions;  
    }

    return options;
  }

  async updateStory(storyPk: string, updateStoryDTO: UpdateStoryDTO): Promise<any> {
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
    .where("pk = :story_pk", { story_pk: storyPk })
    .execute()
    .catch((err) => {
      return err;
    });
  }

  async updatePassage(passagePk: string, updatePassageDTO: UpdatePassageDTO): Promise<any> {
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
    .where("pk = :passage_pk", { passage_pk: passagePk })
    .execute()
    .catch((err) => {
      return err;
    });
  }

  async updateOption(optionPk: string, updateOptionDTO: UpdateTestOptionDTO): Promise<any> {
    return await this.optionRepo.createQueryBuilder()
    .update(Option)
    .set(
      {
        name: updateOptionDTO.name,
        optionVisibleName: updateOptionDTO.optionVisibleName,
        afterStory: updateOptionDTO.afterStory,
        status1: updateOptionDTO.status1,
        status1Num: updateOptionDTO.status1Num,
        status2: updateOptionDTO.status2,
        status2Num: updateOptionDTO.status2Num,
        nextNormalPassage: updateOptionDTO.nextNormalPassage,
      }
    )
    .where("pk = :option_pk", { option_pk: optionPk })
    .execute()
    .catch((err) => {
      return err;
    });
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

  async deleteUploadStory(storyId: string): Promise<any> {
    const result = await this.uploadStoryRepo.delete(storyId);

    if(result.affected == 0) {
      return this.messageService.deleteFail();
    }

    return this.messageService.deleteSuccess();
  }
}