import { OneToOne, OneToMany, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Option } from './option.entity';
import { Character } from 'src/character/entities/character.entity';

@Entity('test_episode')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  genre: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ length: 20, type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  main_text: string;

  @OneToMany(type => Option, options => options.episode)
  options: Option[];

  @OneToOne(type => Character, character => character.episode)
  character: Character;
}