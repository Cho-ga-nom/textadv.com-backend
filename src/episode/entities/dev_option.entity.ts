import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dev_option')
export class DevOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  text: string;

  @Column()
  result_text: string;

  @Column({ default: 0 })
  health_change: number;

  @Column({ default: 0 })
  money_change: number;

  @Column({ default: 0 })
  fullness_change: number;

  @Column({ default: 0 })
  strength_change: number;

  @Column({ default: 0 })
  agility_change: number;

  // 뺄까?
  @Column({ default: 0 })
  armour_change: number;

  @Column({ default: 0 })
  mental_change: number;
}