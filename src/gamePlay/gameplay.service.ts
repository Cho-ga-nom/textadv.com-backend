import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from 'src/episode/entities/episode.entity';
import { CreateEpisodeDTO } from '../episode/dto/create-episode.dto';
import { Repository, Not } from 'typeorm';
import { CreateOptionDTO } from 'src/episode/dto/create-option.dto';
import { Option } from 'src/episode/entities/option.entity';
import { Character } from 'src/character/entities/character.entity';
import { ChangeStatusDTO } from 'src/character/dto/statusChange.dto';
import { CreateMainEpisodeDTO } from 'src/episode/dto/create-main-episode.dto';
import { MainEpisode } from 'src/episode/entities/main-episode.entity';
import { CreateMainEpisodeOptionDTO } from 'src/episode/dto/create-main-episode-option.dto';
import { MainEpisodeOption } from 'src/episode/entities/main-episode-option.entity';
import { CreateStoryDTO } from 'src/episode/dto/create-story.dto';
import { Story } from 'src/episode/entities/test-story.entity';
import { Passage } from 'src/episode/entities/test-passage.entity';
import { CreatePassageDTO } from 'src/episode/dto/create-passage.dto';
import { UpdateStoryDTO } from 'src/episode/dto/update-story.dto';
import { UpdatePassageDTO } from 'src/episode/dto/update-passage.dto';
import { MessageService } from 'src/message/message.service';
import { CreateTestOptionDTO } from 'src/episode/dto/create-test-option.dto';
import { TestOption } from 'src/episode/entities/test-option.entity';
import { UpdateTestOptionDTO } from 'src/episode/dto/update-test-option.dto';

@Injectable()
export class GamePlayService {
  constructor(
    @InjectRepository(Episode) private episodeRepo: Repository<Episode>,
    @InjectRepository(Option) private optionsRepo: Repository<Option>,
    @InjectRepository(Character) private characterRepo: Repository<Character>,
    @InjectRepository(MainEpisode) private mainEpisodeRepo: Repository<MainEpisode>,
    @InjectRepository(MainEpisodeOption) private mainEpisodeOptionRepo: Repository<MainEpisodeOption>,
    @InjectRepository(Story) private storyRepo: Repository<Story>,
    @InjectRepository(Passage) private passageRepo: Repository<Passage>,
    @InjectRepository(TestOption) private testOptionRepo: Repository<TestOption>,
    private readonly messageService: MessageService
  ) {}

  private readonly logger = new Logger(GamePlayService.name);

  async createEpisode(createEpisodeDto: CreateEpisodeDTO) {
    try {
      const episode = new Episode();

      episode.title = createEpisodeDto.title;
      episode.main_text = createEpisodeDto.mainText;

      await this.episodeRepo.insert(episode);
      return episode.id;
    } catch (err) {
      throw new NotFoundException(`Can't create episode`);
    }
  }

  async createOption(createOptionsDTO: CreateOptionDTO) {
    try {
      const option = new Option();

      option.episode = createOptionsDTO.episode;
      option.text = createOptionsDTO.text;
      option.result_text = createOptionsDTO.result_text;
      option.health_change = createOptionsDTO.health_change;
      option.money_change = createOptionsDTO.money_change;
      option.hungry_change = createOptionsDTO.hungry_change;
      option.strength_change = createOptionsDTO.strength_change;
      option.agility_change = createOptionsDTO.agility_change;
      option.armour_change = createOptionsDTO.armour_change;
      option.mental_change = createOptionsDTO.mental_change;

      await this.optionsRepo.insert(option);
      return { msg: 'success', successMsg: '선택지 생성 성공' };
    } catch(err) {
      throw new NotFoundException(`Can't create option`);
    }
  }

  async createMainEpisode(createMainEpisodeDTO: CreateMainEpisodeDTO) {
    try {
      const mainEpisode = new MainEpisode();

      mainEpisode.title = createMainEpisodeDTO.title;
      mainEpisode.main_text = createMainEpisodeDTO.main_text;

      await this.mainEpisodeRepo.insert(mainEpisode);
      return { msg: 'success', successMsg: '메인 에피소드 생성 성공' };
    } catch (err) {
      throw new NotFoundException(`Can't create episode`);
    }
  }

  async createMainEpisodeOption(createMainEpisodeOptionDTO: CreateMainEpisodeOptionDTO) {
    try {
      const mainEpisodeOption = new MainEpisodeOption();

      mainEpisodeOption.episode = createMainEpisodeOptionDTO.episode;
      mainEpisodeOption.text = createMainEpisodeOptionDTO.text;
      mainEpisodeOption.result_text = createMainEpisodeOptionDTO.result_text;
      mainEpisodeOption.health_change = createMainEpisodeOptionDTO.health_change;
      mainEpisodeOption.money_change = createMainEpisodeOptionDTO.money_change;
      mainEpisodeOption.hungry_change = createMainEpisodeOptionDTO.hungry_change;
      mainEpisodeOption.strength_change = createMainEpisodeOptionDTO.strength_change;
      mainEpisodeOption.agility_change = createMainEpisodeOptionDTO.agility_change;
      mainEpisodeOption.armour_change = createMainEpisodeOptionDTO.armour_change;
      mainEpisodeOption.mental_change = createMainEpisodeOptionDTO.mental_change;

      await this.mainEpisodeOptionRepo.insert(mainEpisodeOption);
      return { msg: 'success', successMsg: '메인 에피소드 선택지 생성 성공' };
    } catch(err) {
      throw new NotFoundException(`Can't create option`);
    }
  }

  async createCharacter(episodeId: Episode) {
    try {
      const character = new Character();
      
      character.episode = episodeId;
      character.health = 3;
      character.money = 3;
      character.hungry = 3;
      character.strength = 10;
      character.agility = 10;
      character.armour = 10;
      character.mental = 10;

      await this.characterRepo.insert(character);
      return { msg: 'success', successMsg: '캐릭터 생성 성공' };
    } catch (err) {
      throw new NotFoundException(`Can't create character`);
    }
  }

  async createStory(createStoryDTO: CreateStoryDTO): Promise<any> {
    try {
      const story = new Story();
      
      story.pk = createStoryDTO.pk;
      story.ifid = createStoryDTO.ifid;
      story.id = createStoryDTO.id;
      story.difficulty = createStoryDTO.difficulty;
      story.name = createStoryDTO.name;
      story.writer = createStoryDTO.writer;
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
      passage.storyId = createPassageDTO.storyId;
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

  async createTestOption(createTestOptionDTO: CreateTestOptionDTO): Promise<any> {
    try {
      const option = new TestOption();

      option.normalPassageId = createTestOptionDTO.normalPassageId;
      option.name = createTestOptionDTO.name;
      option.optionVisibleName = createTestOptionDTO.optionVisibleName;
      option.afterStory = createTestOptionDTO.afterStory;
      option.status1 = createTestOptionDTO.status1;
      option.status1Num = createTestOptionDTO.status1Num;
      option.status2 = createTestOptionDTO.status2;
      option.status2Num = createTestOptionDTO.status2Num;
      option.nextNormalPassages = createTestOptionDTO.nextNormalPassages;

      this.logger.debug('성공');
      await this.testOptionRepo.insert(option); 
      return;
    }
    catch (err) {
      return err;
    }
  }

  async getEpisodeById(id: number): Promise<Episode> {
    const episode = await this.episodeRepo.findOne({
      where: { id },
    });

    if(!episode) {
      throw new NotFoundException(`Can't find episode`);
    }

    return episode;
  }

  async getOptionTexts(episodeId: number): Promise<any> {
    const optionTexts = await this.optionsRepo.createQueryBuilder("options")
    .select("options.text")
    .addSelect("options.result_text")
    .where("options.episodeId = :episode_id", { episode_id: episodeId })
    .getMany();

    if(!optionTexts) {
      throw new NotFoundException(`Can't find option texts`);
    }

    return optionTexts;
  }

  async getOptionStatChanges(episodeId: number): Promise<any> {
    const optionStatChanges = await this.optionsRepo.createQueryBuilder("options")
    .select("options.health_change")
    .addSelect("options.money_change")
    .addSelect("options.hungry_change")
    .addSelect("options.strength_change")
    .addSelect("options.agility_change")
    .addSelect("options.armour_change")
    .addSelect("options.mental_change")
    .where("options.episodeId = :episode_id", { episode_id: episodeId })
    .getMany();

    if(!optionStatChanges) {
      throw new NotFoundException(`Can't find option stat changes`)
    }

    return optionStatChanges;
  }

  async getCharacter(currentEpisodeId: number): Promise<Character> {
    const character = await this.characterRepo.createQueryBuilder("character")
    .where("character.episode_id = :current_episode_id", { current_episode_id: currentEpisodeId })
    .getOne();

    if(!character) {
      throw new NotFoundException(`Can't find character`);
    }

    return character;
  }

  async getMainEpisode(): Promise<any> {
    const mainEpisode = await this.mainEpisodeRepo.find();
    
    if(!mainEpisode) {
      throw new NotFoundException(`Can't find main episode`);
    }

    interface Episodes {
      Episode_Text: any,
      Option_Texts: any,
      Option_Stat_Changes: any
    };

    let mainEpisodes: Episodes[] = [];

    let episodeText = mainEpisode;
    let mainOptionTexts = [];
    let mainOptionStatChanges = [];

    for(let i = 0; i < mainEpisode.length; i++) {
      mainOptionTexts.push(await this.getMainEpisodeOptionTexts(mainEpisode[i].id));
      mainOptionStatChanges.push(await this.getMainEpisodeOptionStatChanges(mainEpisode[i].id));

      mainEpisodes.push({
        Episode_Text : episodeText[i], 
        Option_Texts : mainOptionTexts[i], 
        Option_Stat_Changes : mainOptionStatChanges[i]
      });
    }
    // this.logger.debug(mainEpisodes);
    return { mainEpisodes };
  }

  async getMainEpisodeOptionTexts(mainEpisodeId: number): Promise<any> {
    const mainOptionTexts = await this.mainEpisodeOptionRepo.createQueryBuilder("main_options")
    .select("main_options.text")
    .addSelect("main_options.result_text")
    .where("main_options.episodeId = :episode_id", { episode_id: mainEpisodeId })
    .getMany();

    if(!mainOptionTexts) {
      throw new NotFoundException(`Can't find main episode option texts`);
    }

    return mainOptionTexts;
  }

  async getMainEpisodeOptionStatChanges(mainEpisodeId: number): Promise<any> {
    const mainOptionStatChanges = await this.mainEpisodeOptionRepo.createQueryBuilder("main_options")
    .select("main_options.health_change")
    .addSelect("main_options.money_change")
    .addSelect("main_options.hungry_change")
    .addSelect("main_options.strength_change")
    .addSelect("main_options.agility_change")
    .addSelect("main_options.armour_change")
    .addSelect("main_options.mental_change")
    .where("main_options.episodeId = :episode_id", { episode_id: mainEpisodeId })
    .getMany();

    if(!mainOptionStatChanges) {
      throw new NotFoundException(`Can't find main episode option stat changes`);
    }

    return mainOptionStatChanges;
  }

  async getStory(): Promise<Story[]> {
    const stories = await this.storyRepo.find();
    
    if(!stories) {
      throw new NotFoundException(`Not exist Story`);
    }

    return stories;
  }

  async getPassage(): Promise<Passage[]> {
    const passages = await this.passageRepo.find();

    if(!passages) {
      throw new NotFoundException(`Not exist passage`);
    }

    return passages;
  }

  async getOption(): Promise<TestOption[]> {
    const options = await this.testOptionRepo.find();

    if(!options) {
      throw new NotFoundException('Not exist option');
    }

    return options;
  }

  async changeStatus(currentEpisodeId: number, changeStatusDTO: ChangeStatusDTO) {
    return await this.characterRepo
    .createQueryBuilder()
    .update(Character)
    .set(
      {
        health: changeStatusDTO.changed_health,
        money: changeStatusDTO.changed_money,
        hungry: changeStatusDTO.changed_hungry,
        strength: changeStatusDTO.changed_strength,
        agility: changeStatusDTO.changed_agility,
        armour: changeStatusDTO.changed_armour,
        mental: changeStatusDTO.changed_mental,
      }
    )
    .where("episode_id = :episode_id", { episode_id: currentEpisodeId })
    .execute()
    .then(() => {
      return { msg: 'success', successMsg: `캐릭터 업데이트 성공` };
    })
    .catch(() => {
      throw new NotFoundException(`Can't update character`);
    })
  }

  async updateStory(storyId: string, updateStoryDTO: UpdateStoryDTO): Promise<any> {
    return await this.storyRepo.createQueryBuilder()
    .update(Story)
    .set(
      {
        difficulty: updateStoryDTO.difficulty,
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

  async updateOption(optionId: number, updateTestOptionDTO: UpdateTestOptionDTO): Promise<any> {
    return await this.testOptionRepo.createQueryBuilder()
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
        nextNormalPassages: updateTestOptionDTO.nextNormalPassages,
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

  async deleteOption(optionId: number): Promise<any> {
    const result = await this.testOptionRepo.delete(optionId);

    if(result.affected == 0) {
      return this.messageService.deleteFail();
    }

    return this.messageService.deleteSuccess();
  }
}