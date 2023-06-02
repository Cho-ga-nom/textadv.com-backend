import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('html_episode')
export class HtmlEpisode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  mode: number;

  @Column({ default: 1 })
  category: number;

  @Column({ length: 20 })
  author: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'text' })
  html: string;

  @Column({ default: 0 })
  like: number;
}