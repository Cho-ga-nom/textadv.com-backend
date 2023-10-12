import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MakeEpisodeService {
  constructor() {}

  private readonly logger = new Logger(MakeEpisodeService.name);
}