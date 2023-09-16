import { PrimaryColumn, Column, Entity, ManyToOne} from 'typeorm';
import { Story } from './test-story.entity';

@Entity('test-passage')
export class Passage {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
  
  @Column()
  passageType: string;

  // Passage가 속한 스토리 아이디
  @ManyToOne(type => Story, story => story.passages)
  story: Story | string;

  @Column({ type: 'text' })
  text: string;
  
  // 유저에게 보이는 본문
  @Column({ 
    type: 'text',
    nullable: true 
  })
  text_user: string;
  
  @Column({
    type: 'json',
    nullable: true,
  })
  options: string[];
  
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