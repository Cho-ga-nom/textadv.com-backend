import { PrimaryColumn, Column, Entity, UpdateDateColumn, OneToMany } from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-story')
export class Story {
  @PrimaryColumn()
  id: string;
  
  @Column()
  if_id: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  last_update: Date;

  @Column()
  name: string;
  
  @Column()
  start_passage: string;

  @OneToMany(type => Passage, passages => passages.story)
  passages: Passage[];

  @Column({ nullable: true })
  script: string;

  @Column()
  selected: boolean;

  @Column()
  snap_to_grid: boolean;

  @Column()
  story_format: string;

  @Column()
  story_format_version: string;

  @Column({ nullable: true })
  stylesheet: string;

  @Column({ 
    type: 'json',
    nullable: true,
  })
  tags: string[];

  @Column({ nullable: true })
  tag_colors: string;

  @Column()
  zoom: number;
}