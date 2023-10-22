import { PrimaryColumn, Column, Entity, ManyToOne, OneToMany, CreateDateColumn} from 'typeorm';
import { UploadStory } from './upload-story.entity';
import { UploadOption } from './upload-option.entity';

@Entity('upload_passage')
export class UploadPassage {
  @PrimaryColumn()
  pk: string;

  @Column({ type: 'varchar' })
  id: string;

  @Column({ length: 20 })
  passageType: string;

  // Passage가 속한 스토리 Pk
  @ManyToOne(
    type => UploadStory, storyPk => storyPk.passages,
    { onDelete: "CASCADE" }
  )
  storyPk: UploadStory | string;

  // Passage가 속한 스토리 id
  @Column({ type: 'varchar' })
  story: string;

  @Column({ type: 'varchar' })
  parentOfOption: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  optionVisibleName: string;

  @Column({ 
    type: 'text',
    nullable: true
  })
  text: string;
  
  // 유저에게 보이는 본문
  @Column({ 
    type: 'text',
    nullable: true,
  })
  visibleText: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  
  @OneToMany(
    type => UploadOption, options => options.normalPassagePk,
    { cascade: true }
  )
  options: UploadOption[];
  
  @Column()
  height: number;

  @Column()
  highlighted: boolean;

  @Column({ type: 'float' })
  left: number;

  @Column()
  selected: boolean;

  @Column({
    type: 'json', 
    nullable: true, 
  })
  tags: string[];

  @Column()
  top: number;

  @Column()
  width: number;
}