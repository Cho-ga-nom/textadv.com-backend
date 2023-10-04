import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheDbService } from './cache-db.service';
import { CacheDBController } from './cache-db.controller';

@Module({
  imports: [
    CacheModule.register({
      useFactory: async() => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        ttl: 1000,
      })
    }),
  ],
  controllers: [CacheDBController],
  providers: [CacheDbService],
})
export class CacheDBModule {}