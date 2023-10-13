import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { MainStory } from './test-main-story.entity';
import { MainOption } from './test-main-option.entity';

@Entity('test_main_passage')
export class MainPassage {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(
    type => MainStory, storyPk => storyPk.passages,
    { onDelete: "CASCADE" }
  )
  storyPk: MainStory | string;

  @OneToMany(
    type => MainOption, options => options.passagePk,
    { cascade: true }
  )
  options: MainOption[];
}