import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('test_post')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ type: 'varchar' })
  writer: string;

  @Column({ length: 20 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @Column()
  like: number;

  @OneToMany(type => Comment, comments => comments.post_id)
  comments: Comment[];
}