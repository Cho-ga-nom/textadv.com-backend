import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { PostLike } from './post-like.entity';

@Entity('test_post')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  password: string;

  @Column({ type: 'varchar' })
  writer: string;

  @Column()
  category: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  like: number;

  @OneToMany(type => Comment, comments => comments.post_id, {
    cascade: true,
  })
  comments: Comment[];
}