import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm';

@Entity('test_main_passage')
export class MainPassage {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  text: string;

  
}