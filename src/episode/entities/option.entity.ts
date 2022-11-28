import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Episode } from './episode.entity';

@Entity('options')
export class Options {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Episode, episode => episode.options)
  episode: Episode;

  @Column({ length: 100 })
  text: string;

  @Column()
  health_change: number;

  @Column()
  money_change: number;

  @Column()
  hungry_change: number;

  @Column()
  strength_change: number;

  @Column()
  agility_change: number;

  @Column()
  armour_change: number;

  @Column()
  mental_change: number;
}