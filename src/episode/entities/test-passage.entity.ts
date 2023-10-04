import { PrimaryColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { Story } from './test-story.entity';
import { TestOption } from './test-option.entity';

@Entity('test-passage')
export class Passage {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  // 작성자 닉네임
  // @Column()
  // writer: string;
  
  @Column()
  passageType: string;

  // 에피소드 카테고리
  // @Column()
  // category: number;

  // Passage가 속한 스토리 아이디
  @ManyToOne(
    type => Story, story => story.passages,
    { onDelete: "CASCADE" }
  )
  story: Story | string;

  @Column({ type: 'text' })
  text: string;
  
  // 유저에게 보이는 본문
  @Column({ 
    type: 'text',
    nullable: true,
  })
  text_user: string;
  
  @OneToMany(
    type => TestOption, options => options.passage,
    { cascade: true }
  )
  options: TestOption[];

  // @Column({ default: 0 })
  // like: number;

  // @Column({ default: 0 })
  // dislike: number;
  
  @Column()
  height: number;

  @Column()
  highlighted: boolean;

  @Column()
  left: number;

  @Column()
  selected: boolean;

  @Column({
    type: 'json', 
    nullable: true, 
  })
  tags: string[];

  @Column()
  top: number;

  @Column()
  width: number;
}