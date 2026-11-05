import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatService } from './stat.service.js';
import { StatController } from './stat.controller.js';
import { Question, QuestionSchema } from '../question/schema/question.schema.js';
import { Answer, AnswerSchema } from '../answer/schema/answer.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Answer.name, schema: AnswerSchema },
    ]),
  ],
  providers: [StatService],
  controllers: [StatController],
})
export class StatModule {}
