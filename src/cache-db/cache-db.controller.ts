import { Controller, Body, Post, Get, Patch, Param, Logger, Delete } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';

@Controller('cache')
export class CacheDBController {
  constructor(private readonly cacheDbService: CacheDbService) {}
  private readonly logger = new Logger(CacheDBController.name);

}