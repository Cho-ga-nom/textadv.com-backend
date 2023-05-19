import { Module, Global, CacheModule } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';
import * as redisStore from 'cache-manager-redis-store';

export const cacheModule = CacheModule.registerAsync({
  useFactory: async (): Promise<any> => ({
    store: redisStore,           // DB 캐시로 Redis를 사용
    host: 'localhost',
    port: '6397',
    ttl: 0,
    auth_pass: '991112',
  }),
});

@Global()
@Module({
  imports: [cacheModule],
  providers: [CacheDbService],
  exports: [CacheDbModule],
})
export class CacheDbModule {}
