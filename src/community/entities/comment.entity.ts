import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity('test_comment')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  password: string;

  @ManyToOne(type => Post, post_id => post_id.comments, {
    onDelete: 'CASCADE',
  })
  post_id: Post | number;

  // 댓글 작성자를 클릭하면 작성자의 정보를 볼 수 있어야 함
  // 추후 유저 유저 테이블 수정하면서 jOin 추가해야 함
  @Column({ type: 'varchar' })
  writer: string;

  @Column({ length: 500 })
  comment: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: 0 })
  like: number;
}