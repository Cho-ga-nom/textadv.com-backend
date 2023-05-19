import { OneToOne, OneToMany, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { MainEpisodeOption } from './main-episode-option.entity';
import { Character } from 'src/character/entities/character.entity';

@Entity('test_main_episode')
export class MainEpisode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  mode: number;

  @Column({ length: 20, type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  main_text: string;

  @OneToMany(type => MainEpisodeOption, options => options.episode)
  options: MainEpisodeOption[];
}