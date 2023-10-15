import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from 'src/episode/entities/episode.entity';
import { CreateEpisodeDTO } from '../episode/dto/create-episode.dto';
import { Repository } from 'typeorm';
import { CreateOptionDTO } from 'src/episode/dto/create-option.dto';
import { Option } from 'src/episode/entities/option.entity';
import { Character } from 'src/character/entities/character.entity';
import { ChangeStatusDTO } from 'src/character/dto/statusChange.dto';
import { CreateMainEpisodeDTO } from 'src/episode/dto/create-main-episode.dto';
import { MainEpisode } from 'src/episode/entities/main-episode.entity';
import { CreateMainEpisodeOptionDTO } from 'src/episode/dto/create-main-episode-option.dto';
import { MainEpisodeOption } from 'src/episode/entities/main-episode-option.entity';
import { MessageService } from 'src/message/message.service';
import { Story } from 'src/episode/entities/test-story.entity';
import { Passage } from 'src/episode/entities/test-passage.entity';
import { TestOption } from 'src/episode/entities/test-option.entity';
import { GetNextEpisodeDTO } from './dto/get-next-episode.dto';
import { NextEpisode } from './type/next-episode';
import { NextStory } from './type/next-story';
import { NextPassage } from './type/next-passage';
import { NextOption } from './type/next.option';

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

  async getNextEpisode(getNextEpisodeDTO: GetNextEpisodeDTO): Promise<NextEpisode> {
    let nextEpisode: NextEpisode;
    let lastStories = new Set(getNextEpisodeDTO.lastStoryArr);
    let i, story, storyPk;

    for(i = 0; i < 5; i++) {
      story = await this.getStory(getNextEpisodeDTO);
      
      if(lastStories.has(story.pk) === false) {
        storyPk = story.pk;
        nextEpisode.story = story;
        break;
      }
    }

    if(i === 5) {
      nextEpisode.story = story;
    }

    nextEpisode.passages = await this.getPassages(storyPk);
    for(let i = 0; i < nextEpisode.passages.length; i++) {
      nextEpisode.options[i] = await this.getOptions(nextEpisode.passages[i].pk);
    }

    return nextEpisode;
  }

  async getStory(getNextEpisodeDTO: GetNextEpisodeDTO): Promise<NextStory> {
    // 유저의 현재 스탯과 스토리 레벨을 고려하여 선별하는 알고리즘 필요
    const story =  await this.storyRepo.createQueryBuilder()
    .orderBy('RAND()')
    .getOne();

    const { id, ifid, genre, ...nextStory } = story;
    return nextStory;
  }

  async getPassages(storyPk: string): Promise<NextPassage[]> {
    const passages = await this.passageRepo.find({
      select: {
        pk: true,
        name: true,
        visibleText: true
      },
      where: { 
        storyPk: storyPk,
        passageType: 'normalPassage'
      }
    });

    return passages;
  }

  async getOptions(normalPassagePk: string): Promise<NextOption[]> {
    const options = await this.testOptionRepo.find({
      select: {
        optionVisibleName: true,
        afterStory: true,
        status1: true,
        status1Num: true,
        status2: true,
        status2Num: true,
        nextNormalPassage: true
      },
      where: { normalPassagePk: normalPassagePk }
    });

    return options;
  }

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
}