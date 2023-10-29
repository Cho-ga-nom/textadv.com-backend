import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from 'typeorm';

@Entity('test_episode_comment')
export class EpisodeComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  writer: string;

  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ default: 0 })
  like: number;
}