import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity('test_comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Post, post_id => post_id.comments)
  post_id: Post;

  @Column({ length: 500 })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  like: number;
}