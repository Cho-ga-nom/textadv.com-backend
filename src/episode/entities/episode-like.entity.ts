import { TestPlayer } from 'src/player/entities/test-player.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Story } from './test-story.entity';

@Entity('test_episode_like')
export class EpisodeLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => TestPlayer, player => player.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "player_id" })
  player: TestPlayer | string;

  @ManyToOne(type => Story, story => story.pk, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "story_pk "})
  story: Story | string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}