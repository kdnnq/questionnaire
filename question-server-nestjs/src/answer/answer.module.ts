import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service.js';
import { AnswerController } from './answer.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schema/answer.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name:Answer.name, schema: AnswerSchema }])],
  exports: [AnswerService],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
