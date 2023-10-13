import { PrimaryColumn, Column, Entity, UpdateDateColumn, OneToMany } from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-story')
export class Story {
  @PrimaryColumn()
  pk: string;

  @Column({ type: 'varchar' })
  id: string;
  
  @Column({ type: 'varchar' })
  ifid: string;

  @Column({ default: 1 })
  genre: number;

  @Column({ default: 1 })
  difficulty: number;

  @Column({ 
    nullable: true,
    length: 20,
  })
  writer: string;

  @Column({ length: 20 })
  name: string;
  
  @Column()
  startPassage: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  lastUpdate: Date;

  @OneToMany(
    type => Passage, passages => passages.storyPk,
    { cascade: true }
  )
  passages: Passage[];

  @Column({ 
    nullable: true,
    type: 'varchar'
  })
  script: string;

  @Column()
  selected: boolean;

  @Column()
  snapToGrid: boolean;

  @Column({ type: 'varchar' })
  storyFormat: string;

  @Column({ type: 'varchar' })
  storyFormatVersion: string;

  @Column({ nullable: true })
  stylesheet: string;

  @Column({ 
    type: 'json',
    nullable: true,
  })
  tags: string[];

  @Column({ 
    nullable: true,
    type: 'varchar'
  })
  tagColors: string;

  @Column()
  zoom: number;
}