import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity('test-episode-comment')
export class EpisodeComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  writer: string;

  
}