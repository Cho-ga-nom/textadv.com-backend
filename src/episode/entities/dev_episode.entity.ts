import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('dev_episode')
export class DevEpisode {
  @PrimaryGeneratedColumn()
  id: number;
  
  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: 1 })
  mode: number;

  @Column()
  category: number;

  @Column()
  title: string;

  @Column()
  main_text: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;
}