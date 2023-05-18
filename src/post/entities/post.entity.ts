import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('test_post')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ type: 'varchar' })
  writer: string;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @Column({ default: 0 })
  like: number;

  //@Column({ nullable: true })
  @OneToMany(type => Comment, comments => comments.post_id)
  comments: Comment[];
}