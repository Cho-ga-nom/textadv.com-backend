import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from 'src/episode/entities/episode.entity';
import { CreateEpisodeDTO } from '../episode/dto/create-episode.dto';
import { Repository } from 'typeorm';
import { CreateOptionsDTO } from 'src/episode/dto/create-options.dto';
import { Options } from 'src/episode/entities/option.entity';
import { CharacterDTO } from 'src/character/dto/character.dto';
import { Character } from 'src/character/entities/character.entity';

@Injectable()
export class GamePlayService {
  constructor(
    @InjectRepository(Episode) private episodeRepo: Repository<Episode>,
    @InjectRepository(Options) private optionsRepo: Repository<Options>,
    @InjectRepository(Character) private characterRepo: Repository<Character>,
  ) {}

  async createEpisode(createEpisodeDto: CreateEpisodeDTO) {
    try {
      const episode = new Episode();

      episode.title = createEpisodeDto.title;
      episode.mainText = createEpisodeDto.mainText;

      await this.episodeRepo.insert(episode);
      return { msg: 'success', successMsg: '에피소드 생성 성공' };
    } catch (err) {
      throw new NotFoundException(`Can't create episode`);
    }
  }

  async createOptions(createOptionsDTO: CreateOptionsDTO) {
    try {
      const option = new Options();

      option.episode = createOptionsDTO.episode;
      option.text = createOptionsDTO.text;
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

  async createCharacter(characterDTO: CharacterDTO) {
    try {
      const character = new Character();

      character.episode = characterDTO.episode;
      character.health = characterDTO.health;
      character.money = characterDTO.money;
      character.hungry = characterDTO.hungry;
      character.strength = characterDTO.strength;
      character.agility = characterDTO.agility;
      character.armour = characterDTO.armour;
      character.mental = characterDTO.mental;

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
    return episode;
  }
}