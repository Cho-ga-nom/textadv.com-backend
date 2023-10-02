import { Module, Global, CacheModule } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';
import { CacheDBController } from './cache-db.controller';
import * as redisStore from 'cache-manager-redis-store';

export const cacheModule = CacheModule.registerAsync({
  useFactory: async (): Promise<any> => ({
    store: redisStore,           // DB 캐시로 Redis를 사용
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASSWORD,
    ttl: 60,
    max: 1000
  }),
});

@Global()
@Module({
  imports: [cacheModule],
  controllers: [CacheDBController],
  providers: [CacheDbService],
  exports: [CacheDbModule],
})
export class CacheDbModule {}
