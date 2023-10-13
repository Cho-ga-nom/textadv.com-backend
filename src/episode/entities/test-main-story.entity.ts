import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('test_main_story')
export class MainStory {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ default: 1 })
  genre: number;

  @Column({ default: 1 })
  level: number;

  @Column({ length: 20 })
  name: string;

  
}