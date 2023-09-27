import { Module, Global, CacheModule } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';
import * as redisStore from 'cache-manager-redis-store';
import { CacheDBController } from './cache-db.controller';

export const cacheModule = CacheModule.registerAsync({
  useFactory: async (): Promise<any> => ({
    store: redisStore,           // DB 캐시로 Redis를 사용
    host: 'localhost',
    port: '6379',
    auth_pass: '991112',
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
