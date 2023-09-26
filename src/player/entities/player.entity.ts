import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm'

@Entity('player')
export class Player {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn()
  updatedAt: Date;
}