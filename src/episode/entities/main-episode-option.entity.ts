import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MainEpisode } from './main-episode.entity';

@Entity('test_main_episode_options')
export class MainEpisodeOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => MainEpisode, episode => episode.options)
  episode: MainEpisode;

  @Column({ length: 100 })
  text: string;

  @Column({ length: 100 })
  result_text: string;

  @Column({ default: 0 })
  health: number;

  @Column({ default: 0 })
  money: number;

  @Column({ default: 0 })
  hungry: number;

  @Column({ default: 0 })
  strength: number;

  @Column({ default: 0 })
  agility: number;

  @Column({ default: 0 })
  armour: number;

  @Column({ default: 0 })
  mental: number;
}