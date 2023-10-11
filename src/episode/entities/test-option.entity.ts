import { PrimaryColumn, Column, Entity, ManyToOne} from 'typeorm';
import { Passage } from './test-passage.entity';

@Entity('test-option')
export class TestOption {
  @PrimaryColumn()
  pk: string;

  @ManyToOne(
    type => Passage, normalPassagePk => normalPassagePk.options,
    { onDelete: "CASCADE" }
  )
  normalPassagePk: Passage | string;

  @Column({ type: 'varchar' })
  name: string; 

  @Column({ type: 'varchar' })
  optionVisibleName: string;

  @Column({ type: 'varchar' })
  afterStory: string;

  @Column({ length: 10 })
  status1: string;

  @Column()
  status1Num: number;

  @Column({ length: 10 })
  status2: string;

  @Column()
  status2Num: number;

  @Column({ 
    type: 'simple-array',
    nullable: true,
  })
  nextNormalPassages: string[];
}