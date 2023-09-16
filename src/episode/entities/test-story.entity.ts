import { PrimaryColumn, Column, Entity, UpdateDateColumn, OneToMany } from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-story')
export class Story {
  @PrimaryColumn()
  id: string;
  
  @Column()
  ifid: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  lastUpdate: Date;

  @Column()
  name: string;
  
  @Column()
  startPassage: string;

  @OneToMany(type => Passage, passages => passages.story)
  passages: Passage[];

  @Column({ nullable: true })
  script: string;

  @Column()
  selected: boolean;

  @Column()
  snapToGrid: boolean;

  @Column()
  storyFormat: string;

  @Column()
  storyFormatVersion: string;

  @Column({ nullable: true })
  stylesheet: string;

  @Column({ 
    type: 'json',
    nullable: true,
  })
  tags: string[];

  @Column({ nullable: true })
  tagColors: string;

  @Column()
  zoom: number;
}