import { Controller, Get, Render } from '@nestjs/common';

@Controller('select')
export class SelectController {

  @Get()
  @Render('select')
  root() {}
}