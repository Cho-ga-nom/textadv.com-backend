import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity('test_comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Post, post_id => post_id.comments, {
    onDelete: 'CASCADE',
  })
  post_id: Post;

  @Column({ length: 500 })
  comment: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column()
  like: number;
}