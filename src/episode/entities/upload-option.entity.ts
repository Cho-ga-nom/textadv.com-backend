import { PrimaryColumn, Column, Entity, ManyToOne, CreateDateColumn } from 'typeorm';
import { UploadPassage } from './upload-passage.entity';

@Entity('upload_option')
export class UploadOption {
  @PrimaryColumn()
  pk: string;

  @ManyToOne(
    type => UploadPassage, normalPassagePk => normalPassagePk.options,
    { onDelete: "CASCADE" }
  )
  normalPassagePk: UploadPassage | string;

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
    type: 'varchar',
    nullable: true,
  })
  nextNormalPassage: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}