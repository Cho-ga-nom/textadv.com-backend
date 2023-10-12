import { Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { TestPlayer } from 'src/player/entities/test-player.entity';

@Entity('test_post_like')
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => TestPlayer, player => player.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "player_id" })
  player: TestPlayer | string;

  @ManyToOne(type => Post, post => post.post_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "post_id" })
  post: Post | number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}