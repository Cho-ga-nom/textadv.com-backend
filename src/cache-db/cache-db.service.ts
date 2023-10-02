import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PlayerPostDTO } from 'src/community/dto/player-post.dto';
import { RedisClientType } from 'redis';

// 읽기 빈도가 많은 작업에 캐시를 이용
// 업데이트 작업이 있을 경우에는 캐시 데이터에 씌운 다음 DB에 업데이트
@Injectable()
export class CacheDbService {
  // 생성자 안에 캐시 사용 -> 이를 통해 로직 실행
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}
  
  private readonly logger = new Logger(CacheDbService.name);

  async get() {
    const cacheItem = await this.cacheManager.get('cached_item');
    this.logger.debug(cacheItem);
  }
  
  async set(viewDTO: PlayerPostDTO) {
    await this.cacheManager.set(`${viewDTO.player_id}`, { key: viewDTO.post_id });
  }
}
