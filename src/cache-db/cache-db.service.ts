import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// 읽기 빈도가 많은 작업에 캐시를 이용
@Injectable()
export class CacheDbService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private readonly logger = new Logger(CacheDbService.name);

  async setView(postId: string, view: number) {
    await this.cache.set(postId, view);
  }
  
  async setViewList(userId: string, postId: string) {
    const updatedList = (await this.getViewList(userId)).concat(postId);
    await this.cache.set(userId, updatedList);
  }

  async getView(key: string): Promise<number> {
    return await this.cache.get(key);
  }

  async getViewList(userId: string): Promise<string[]> {
    return await this.cache.get(userId) || [];
  }

  async resetView() {
    await this.cache.reset();
  }

  async updateView(userId: string, postId: string) {
    if((await this.getViewList(userId)).includes(postId) === true) {
      return;
    }

    let currentView = await this.getView(postId);
    this.setView(postId, currentView + 1);
    this.setViewList(userId, postId);
  }
}
