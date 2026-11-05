import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatService } from './stat.service.js';
import { Public } from '../auth/decorators/public.decorator.js';

@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Public()
  @Get('home/data')
  getHomeStat() {
    return this.statService.getHomeStat();
  }

  @Get(':questionId')
  getQuestionStatList(
    @Param('questionId') questionId: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.statService.getQuestionStatList(questionId, { page, pageSize });
  }

  @Get(':questionId/:componentId')
  getComponentStat(
    @Param('questionId') questionId: string,
    @Param('componentId') componentId: string,
  ) {
    return this.statService.getComponentStat(questionId, componentId);
  }
}
