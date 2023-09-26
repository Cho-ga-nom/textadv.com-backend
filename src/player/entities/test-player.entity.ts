import { Entity, PrimaryColumn, Column, UpdateDateColumn, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer';
import { Like } from 'src/community/entities/like.entity';

@Entity('test_player')
export class TestPlayer {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn()
  updatedAt: Date;

  // Refresh Token
  @Column({ nullable: true })   // Refresh Token은 로그아웃시 Null이 되기 때문에 nullable
  @Exclude()                    // http 응답 시 토큰 정보 제외
  refresh_token?: string;

  @OneToMany(type => Like, like_info => like_info.player, {
    cascade: true,
  })
  like_info: Like[];
}