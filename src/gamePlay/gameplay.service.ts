import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { MessageService } from 'src/message/message.service';
import { GetNextEpisodeDTO } from './dto/get-next-episode.dto';
import { NextEpisode } from './type/next-episode';
import { NextStory } from './type/next-story';
import { NextPassage } from './type/next-passage';
import { NextOption } from './type/next.option';
import { EpisodeLike } from 'src/episode/entities/episode-like.entity';
import { PlayerEpisodeDTO } from './dto/player-episode.dto';
import { UploadStory } from 'src/episode/entities/upload-story.entity';
import { UploadPassage } from 'src/episode/entities/upload-passage.entity';
import { UploadOption } from 'src/episode/entities/upload-option.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GamePlayService {
  constructor(
    @InjectRepository(UploadStory) private storyRepo: Repository<UploadStory>,
    @InjectRepository(UploadPassage) private passageRepo: Repository<UploadPassage>,
    @InjectRepository(UploadOption) private testOptionRepo: Repository<UploadOption>,
    @InjectRepository(EpisodeLike) private episodeLikeRepo: Repository<EpisodeLike>,
    private readonly messageService: MessageService
  ) {}

  private readonly logger = new Logger(GamePlayService.name);

  async getNextStoryAndPassage(getNextEpisodeDTO: GetNextEpisodeDTO): Promise<NextEpisode> {
    let lastStories = new Set(getNextEpisodeDTO.lastStoryArr);
    let i, storyPk;
    let nextStory: NextStory;
    let nextPassages: NextPassage[];
    let nextOptions: NextOption[][] = [];

    for(i = 0; i < 5; i++) {
      nextStory = await this.getStory(getNextEpisodeDTO);
      
      if(lastStories.has(nextStory.pk) === false) {
        storyPk = nextStory.pk;
        break;
      }
    }

    if(i === 5) {
      storyPk = nextStory.pk;
    }

    nextPassages = await this.getPassages(storyPk);
    for(let i = 0; i < nextPassages.length; i++) {
      nextOptions.push(await this.getOptions(nextPassages[i].pk));
    }

    const nextEpisode: NextEpisode = {
      nextStory: nextStory,
      nextPassages: nextPassages,
      nextOptions: nextOptions
    };

    return nextEpisode;
  }

  async getStory(getNextEpisodeDTO: GetNextEpisodeDTO): Promise<NextStory> {
    // 유저의 현재 스탯과 스토리 레벨을 고려하여 선별하는 알고리즘 필요
    const story =  await this.storyRepo.createQueryBuilder()
    .orderBy("RANDOM()")
    .getOne();

    const { 
      id, ifid, genre, script, selected, snapToGrid, storyFormat, 
      storyFormatVersion, stylesheet, tags, tagColors, zoom, 
      ...nextStory } = story;
    return nextStory;
  }

  async getPassages(storyPk: string): Promise<NextPassage[]> {
    const passages = await this.passageRepo.find({
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
        passageType: 'normalPassage'
      }
    });

    return passages;
  }

  async getOptions(normalPassagePk: string): Promise<NextOption[]> {
    const options = await this.testOptionRepo.find({
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
      where: { normalPassagePk: { pk: normalPassagePk } }
    });

    return options;
  }

  async checkLike(checkDTO: PlayerEpisodeDTO): Promise<number | any> {
    const result = await this.episodeLikeRepo.findOne({
      relations: {
        player: true,
        story: true,
      },
      where: {
        player: { id: checkDTO.player_id },
        story: { pk: checkDTO.storyPk },
        type: 1,
      }
    });
    
    if(result === null) {
      return result;
    }
    else {
      return result.id;
    }
  }
  
  async updateLike(episodeLikeDTO: PlayerEpisodeDTO): Promise<boolean> {
    const result = await this.checkLike(episodeLikeDTO);
    
    try {
      if(result === null) {
        const story = await this.storyRepo.findOne({
          where: { pk: episodeLikeDTO.storyPk }
        });
  
        const updatedLike = story.like + 1;
        await this.storyRepo.update(episodeLikeDTO.storyPk, {
          like: updatedLike
        });

        const likeLog = new EpisodeLike();
        likeLog.player = episodeLikeDTO.player_id;
        likeLog.story = episodeLikeDTO.storyPk;
        likeLog.type = 1;
        await this.episodeLikeRepo.insert(likeLog);
        return true;
      }
      else {
        return false;
      }
    }
    catch(err) {
      return err;
    }
  }

  async checkDisLike(checkDTO: PlayerEpisodeDTO): Promise<number | any> {
    const result = await this.episodeLikeRepo.findOne({
      relations: {
        player: true,
        story: true,
      },
      where: {
        player: { id: checkDTO.player_id },
        story: { pk: checkDTO.storyPk },
        type: -1,
      }
    });

    if(result === null) {
      return result;
    }
    else {
      return result.id;
    }
  }

  async updateDislike(episodeLikeDTO: PlayerEpisodeDTO): Promise<boolean> {
    const result = await this.checkDisLike(episodeLikeDTO);

    try {
      if(result === null) {
        const story = await this.storyRepo.findOne({
          where: { pk: episodeLikeDTO.storyPk }
        });
  
        const updatedDislike = story.dislike + 1;
        await this.storyRepo.update(episodeLikeDTO.storyPk, {
          dislike: updatedDislike
        });

        const likeLog = new EpisodeLike();
        likeLog.player = episodeLikeDTO.player_id;
        likeLog.story = episodeLikeDTO.storyPk;
        likeLog.type = -1;
        await this.episodeLikeRepo.insert(likeLog);
        return true;
      }
      else {
        return false;
      }
    }
    catch(err) {
      return err;
    }
  }

  async findOldStoryLike(currentTime: number): Promise<EpisodeLike[]> {
    const now = new Date(currentTime);
    const result = await this.episodeLikeRepo.find({
      where: {
        createdAt: LessThan(now),
        type: 1
      }
    });

    return result;
  }

  @Cron(CronExpression.EVERY_WEEK)
  async deleteOldStoryLike(): Promise<any> {
    const currentTime = new Date().getTime();
    const oldStoryLikes = await this.findOldStoryLike(currentTime);

    if(oldStoryLikes.length === 0) {
      return;
    }

    for(const storyLike of oldStoryLikes) {
      const result = await this.episodeLikeRepo.delete(storyLike.id);

      if(result.affected === 0) {
        return this.messageService.deleteFail();
      }
    }
  }

  async findOldStoryDislike(currentTime: number): Promise<EpisodeLike[]> {
    const now = new Date(currentTime);
    const result = await this.episodeLikeRepo.find({
      where: {
        createdAt: LessThan(now),
        type: -1
      }
    });

    return result;
  }

  @Cron(CronExpression.EVERY_WEEK)
  async deleteOldStoryDislike(): Promise<any> {
    const currentTime = new Date().getTime();
    const oldStoryLikes = await this.findOldStoryLike(currentTime);

    if(oldStoryLikes.length === 0) {
      return;
    }

    for(const storyLike of oldStoryLikes) {
      const result = await this.episodeLikeRepo.delete(storyLike.id);

      if(result.affected === 0) {
        return this.messageService.deleteFail();
      }
    }
  }
}