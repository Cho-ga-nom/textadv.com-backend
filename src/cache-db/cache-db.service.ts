import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// 읽기 빈도가 많은 작업에 캐시를 이용
// 업데이트 작업이 있을 경우에는 캐시 데이터에 씌운 다음 DB에 업데이트
@Injectable()
export class CacheDbService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private readonly logger = new Logger(CacheDbService.name);

  async setView(key: string) {
    const updatedView = await this.getView(key) + 1;
    this.cache.set(key, updatedView);
  }

  async getView(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async getAllView(): Promise<any> {
    const keys = await this.cache.store.keys('*');
  }

  async resetView() {
    await this.cache.reset();
  }
}
