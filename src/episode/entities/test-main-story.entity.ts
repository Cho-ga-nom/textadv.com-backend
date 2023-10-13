import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { MainPassage } from './test-main-passage.entity';

@Entity('test_main_story')
export class MainStory {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ default: 1 })
  genre: number;

  @Column({ default: 1 })
  level: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(
    type => MainPassage, passages => passages.storyPk,
    { cascade: true }
  )
  passages: MainPassage[];
}