import { Controller, Get, Param, Post, Body, Patch, Logger, Delete } from '@nestjs/common';
import { MakeEpisodeService } from './make-episode.service';

@Controller('make_episode')
export class MakeEpisodeController {
  constructor(makeEpisodeService: MakeEpisodeService) {}

  private readonly logger = new Logger(MakeEpisodeController.name);
}