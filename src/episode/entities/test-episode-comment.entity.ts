import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { TestPlayer } from 'src/player/entities/test-player.entity';

@Entity('test-episode-comment')
export class EpisodeComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  writer: string;

  
}