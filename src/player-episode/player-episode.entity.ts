import { OneToOne, OneToMany, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { PlayerOption } from './player-option.entity';
import { PlayerCharacter } from 'src/player-character/player-character.entity';

@Entity('player_episode')
export class PlayerEpisode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  genre: number;

  @Column({ length: 20 })
  author: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ length: 20, type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  mainText: string;

  @OneToMany(type => PlayerOption, options => options.episode_id)
  options: PlayerOption[];

  @OneToOne(type => PlayerCharacter, character => character.episode_id)
  character: PlayerCharacter;
}