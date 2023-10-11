import { PrimaryGeneratedColumn, Column, Entity, ManyToOne} from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-option')
export class TestOption {
  @PrimaryGeneratedColumn()
  pk: number;

  @ManyToOne(
    type => Passage, normalPassageId => normalPassageId.options,
    { onDelete: "CASCADE" }
  )
  normalPassageId: Passage | string;

  @Column({ type: 'varchar' })
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

  @Column({ 
    type: 'simple-array',
    nullable: true,
  })
  nextNormalPassages: string[];
}