import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEpisode } from './player-episode.entity';

@Entity('player_option')
export class PlayerOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => PlayerEpisode, episode_id => episode_id.options)
  episode_id: PlayerEpisode;

  @Column({ length: 100 })
  text: string;

  @Column({ length: 100 })
  result_text: string;

  @Column({ default: 0 })
  health_change: number;

  @Column({ default: 0 })
  money_change: number;

  @Column({ default: 0 })
  hungry_change: number;

  @Column({ default: 0 })
  strength_change: number;

  @Column({ default: 0 })
  agility_change: number;

  @Column({ default: 0 })
  armour_change: number;

  @Column({ default: 0 })
  mental_change: number;
}