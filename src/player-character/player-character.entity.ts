import { PlayerEpisode } from 'src/player-episode/player-episode.entity';
import { OneToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player_character')
export class PlayerCharacter {
  @PrimaryGeneratedColumn()
  id: number;

  /*@Column({ length: 20 })
  nickname: string;*/

  @OneToOne(type => PlayerEpisode, episode_id => episode_id.character)
  episode_id: PlayerEpisode;

  @Column()
  health: number;

  @Column()
  money: number;

  @Column()
  hungry: number;

  @Column()
  strength: number;

  @Column()
  agility: number;

  @Column()
  armour: number;

  @Column()
  mental: number;
}