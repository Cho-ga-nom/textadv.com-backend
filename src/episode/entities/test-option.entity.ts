// import { PrimaryColumn, Column, Entity, ManyToOne} from 'typeorm';
// import { Passage } from './test-passage.entity';

// @Entity('test-option')
// export class Option {
//   // id에 뭘 넣어야 할지 정해야 함
//   @PrimaryColumn()
//   id: string;

//   @ManyToOne(
//     type => Passage, passage => passage.opions,
//     { onDelete: "CASCADE" }
//   )
//   passage: Passage | string;

//   @Column()
//   text: string;

//   @Column()
//   result_text: string;

//   @Column()
//   stat1: string;

//   @Column()
//   stat1_change: number;

//   @Column()
//   stat2: string;

//   @Column()
//   stat2_change: number;
// }