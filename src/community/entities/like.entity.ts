import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';
import { TestPlayer } from 'src/player/entities/test-player.entity';

@Entity('test_like')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => TestPlayer, player => player.like_info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "player_id" })
  player: TestPlayer | string;

  @ManyToOne(type => Post, post => post.like_info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "post_id" })
  post: Post | number;
}