import { PrimaryGeneratedColumn, Column, Entity, ManyToOne} from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-option')
export class TestOption {
  @PrimaryGeneratedColumn()
  pk: number;

  @ManyToOne(
    type => Passage, passage => passage.options,
    { onDelete: "CASCADE" }
  )
  passage: Passage | number;

  @Column({ length: 20 })
  name: string; 

  @Column({ type: 'varchar' })
  optionVisibleName: string;

  @Column({ type: 'varchar' })
  afterStory: string;

  @Column({ length: 5 })
  status1: string;

  @Column()
  status1Num: number;

  @Column({ length: 5 })
  status2: string;

  @Column()
  status2Num: number;

  @Column({ type: 'simple-array' })
  nextPassage: string[];
}