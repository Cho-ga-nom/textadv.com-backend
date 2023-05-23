import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('test_post')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ type: 'varchar' })
  writer: string;

  @Column({ default: 0 })
  category: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @OneToMany(type => Comment, comments => comments.post_id, {
    cascade: true,
  })
  comments: Comment[];
}