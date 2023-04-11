import { Episode } from 'src/episode/entities/episode.entity';
import { MainEpisode } from 'src/episode/entities/main_episode.entity';
import { JoinColumn, OneToOne, Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test_character')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Episode, episode => episode.character)
  @JoinColumn({
    name: 'episode_id',
    referencedColumnName: 'id',
  })
  episode: Episode;

  @OneToOne(type => MainEpisode, main_episode => main_episode.character)
  @JoinColumn({
    name: 'main_episode_id',
    referencedColumnName: 'id',
  })
  main_episode: MainEpisode;

  @Column({ })
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