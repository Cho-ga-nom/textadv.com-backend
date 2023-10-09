import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GamePlayModule } from './gamePlay/gameplay.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { MessageModule } from './message/message.module';
import { CacheDBModule } from './cache-db/cache-db.module';
import { CommunityModule } from './community/community.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host : process.env.POSTGRES_HOST,
      //url: process.env.DATABASE_URL,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GamePlayModule,
    AuthModule,
    PlayerModule,
    MessageModule,
    CacheDBModule,
    CommunityModule,
    EpisodeModule,
  ],
})
export class AppModule {}
