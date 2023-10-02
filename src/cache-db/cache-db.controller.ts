import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';
import { PlayerPostDTO } from 'src/community/dto/player-post.dto';

@Controller('cache')
export class CacheDBController {
  constructor(private readonly cacheService: CacheDbService) {}

  @Post('set')
  async insert() {

  }

  @Get('get')
  async read() {

  }

  @Get('test_get')
  async testGet() {
    return this.cacheService.get();
  }

  @Post('test_set')
  async testSet(@Body() viewDTO: PlayerPostDTO) {
    return this.cacheService.set(viewDTO);
  }
}