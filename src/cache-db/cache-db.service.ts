import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

// 읽기 빈도가 많은 작업에 캐시를 이용
// 업데이트 작어이 있을 경우에는 캐시 데이터에 씌운 다음 DB에 업데이트

@Injectable()
export class CacheDbService {
  // 생성자 안에 캐시 사용 -> 이를 통해 로직 실행
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string): Promise<boolean> {
    await this.cacheManager.set(key, value);
    return true;
  }

  async getKey(key: string): Promise<string> {
    const val = (await this.cacheManager.get(key)) as string;
    return val;
  }
}
