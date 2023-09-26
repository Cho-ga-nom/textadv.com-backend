import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity('test_post')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  password: string;

  // 댓글 작성자를 클릭하면 작성자의 정보를 볼 수 있어야 함
  // 추후 유저 유저 테이블 수정하면서 jOin 추가해야 함
  @Column({ type: 'varchar' })
  writer: string;

  @Column()
  category: number;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  like: number;

  @OneToMany(type => Comment, comments => comments.post_id, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(type => Like, like_info => like_info.post, {
    cascade: true,
  })
  like_info: Like[];
}