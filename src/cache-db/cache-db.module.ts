import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheDbService } from './cache-db.service';

@Module({
  imports: [
    CacheModule.register({
      useFactory: async() => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        ttl: 3600,
      })
    }),
  ],
  providers: [CacheDbService],
})
export class CacheDBModule {}