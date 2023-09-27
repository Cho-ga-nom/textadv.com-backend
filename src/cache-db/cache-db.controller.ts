import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';

@Controller('cache')
export class CacheDBController {
  constructor(private readonly cacheService: CacheDbService) {}

  @Post('set')
  async insert() {

  }

  @Get('get')
  async read() {

  }

  @Get('test')
  async test() {
    return this.cacheService.getHello();
  }
}