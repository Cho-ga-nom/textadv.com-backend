import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Episode } from './episode.entity';

@Entity('test_options')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Episode, episode => episode.options)
  episode: Episode | number;

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