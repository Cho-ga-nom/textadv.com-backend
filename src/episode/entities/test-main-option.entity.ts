import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm';

@Entity('test_main_option')
export class MainOption {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  afterStory: string;

  @Column({ length: 10 })
  status1: number;

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