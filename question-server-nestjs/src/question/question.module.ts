import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller.js';
import { QuestionService } from './question.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import {Question, QuestionSchema } from './schema/question.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  exports: [QuestionService],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
