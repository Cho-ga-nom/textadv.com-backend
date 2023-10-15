import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm';

@Entity('test-episode-comment')
export class EpisodeComment {
  @PrimaryGeneratedColumn()
  id: number;

}