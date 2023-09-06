
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;
  
  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: 1 })
  mode: number;

  @Column()
  category: number;

  @Column()
  title: string;

  @Column()
  main_text: string;   // html string
}