import { PrimaryColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UploadPassage } from './upload-passage.entity';

@Entity('upload_story')
export class UploadStory {
  @PrimaryColumn()
  pk: string;

  @Column({ type: 'varchar' })
  id: string;
  
  @Column({ type: 'varchar' })
  ifid: string;

  @Column({ default: 1 })
  genre: number;

  @Column({ default: 1 })
  level: number;

  @Column({ 
    nullable: true,
    length: 20,
  })
  userNickname: string;

  @Column({ length: 20 })
  name: string;
  
  @Column()
  startPassage: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  lastUpdate: Date;

  @OneToMany(
    type => UploadPassage, passages => passages.storyPk,
    { cascade: true }
  )
  passages: UploadPassage[];

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