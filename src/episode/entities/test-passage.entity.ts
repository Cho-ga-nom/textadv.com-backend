import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { Story } from './test-story.entity';
import { TestOption } from './test-option.entity';

@Entity('test-passage')
export class Passage {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'varchar' })
  id: string;

  @Column({ length: 20 })
  passageType: string;

  // Passage가 속한 스토리 아이디
  @ManyToOne(
    type => Story, story => story.passages,
    { onDelete: "CASCADE" }
  )
  story: Story | number;

  @Column({ type: 'varchar' })
  parentOfOption: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 20 })
  optionVisibleName: string;

  @Column({ 
    type: 'text',
    nullable: true
  })
  text: string;
  
  // 유저에게 보이는 본문
  @Column({ 
    type: 'text',
    nullable: true,
  })
  visibleText: string;
  
  @OneToMany(
    type => TestOption, options => options.normalPassageId,
    { cascade: true }
  )
  options: TestOption[];
  
  @Column()
  height: number;

  @Column()
  highlighted: boolean;

  @Column({ type: 'float' })
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