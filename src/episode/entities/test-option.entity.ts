import { PrimaryColumn, Column, Entity, ManyToOne} from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-option')
export class TestOption {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  passageType: string;

  @Column()
  story: string;

  @ManyToOne(
    type => Passage, passage => passage.options,
    { onDelete: "CASCADE" }
  )
  passage: Passage | string;

  @Column({ type: 'text' })
  after_story: string;

  @Column({ 
    type: 'text',
    nullable: true,
    default: "",
  })
  text: string;

  // 유저에게 보이는 본문
  @Column({ 
    type: 'text',
    nullable: true,
    default: "",
  })
  text_user: string;

  @Column({
    type: 'simple-array',
    nullable: true,
    default: "",
  })
  options: string[];

  @Column()
  status1: string;

  @Column()
  status1_num: number;

  @Column()
  status2: string;

  @Column()
  status2_num: number;

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