import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../question/schema/question.schema.js';
import { Answer, AnswerDocument } from '../answer/schema/answer.schema.js';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Answer.name) private readonly answerModel: Model<AnswerDocument>,
  ) {}

  async getQuestionStatList(
    questionId: string,
    opt: { page: number; pageSize: number },
  ): Promise<{ total: number; list: Array<Record<string, unknown>> }> {
    if (!questionId) return { total: 0, list: [] };
    const { page = 1, pageSize = 10 } = opt;

    const total = await this.answerModel.countDocuments({ questionId });
    const rawList = await this.answerModel
      .find({ questionId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });

    const list = rawList.map((answer) => {
      const flat: Record<string, unknown> = { _id: (answer as any)._id };
      if (Array.isArray(answer.answerList)) {
        answer.answerList.forEach((item) => {
          flat[item.componentFeId] = item.value;
        });
      }
      return flat;
    });

    return { total, list };
  }

  async getComponentStat(
    questionId: string,
    componentId: string,
  ): Promise<{ stat: Array<{ name: string; count: number }> }> {
    if (!questionId || !componentId) return { stat: [] };

    // 1. 查问卷，定位目标组件的 type 和 props
    const question = await this.questionModel.findById(questionId);
    if (!question) return { stat: [] };

    const component = (question.componentList || []).find(
      (c) => c.fe_id === componentId,
    );
    if (!component) return { stat: [] };

    const { type, props } = component;
    let options: Array<{ value: string; text: string }> = [];

    if (type === 'questionRadio' && props && (props as any).options) {
      options = (props as any).options.map((o: any) => ({
        value: o.value,
        text: o.text,
      }));
    } else if (type === 'questionCheckbox' && props && (props as any).list) {
      options = (props as any).list.map((o: any) => ({
        value: o.value,
        text: o.text,
      }));
    } else {
      return { stat: [] };
    }

    const countMap = new Map<string, number>();
    options.forEach((o) => countMap.set(o.value, 0));

    const answers = await this.answerModel.find({ questionId });
    answers.forEach((answer) => {
      const target = (answer.answerList || []).find(
        (a) => a.componentFeId === componentId,
      );
      if (target && Array.isArray(target.value)) {
        target.value.forEach((v: string) => {
          if (countMap.has(v)) {
            countMap.set(v, (countMap.get(v) as number) + 1);
          }
        });
      }
    });

    const stat = options.map((o) => ({
      name: o.text,
      count: countMap.get(o.value) || 0,
    }));

    return { stat };
  }

  async getHomeStat(): Promise<{
    createdCount: number;
    publishedCount: number;
    answerCount: number;
  }> {
    const [createdCount, publishedCount, answerCount] = await Promise.all([
      this.questionModel.countDocuments({ isDeleted: false }),
      this.questionModel.countDocuments({ isPublished: true, isDeleted: false }),
      this.answerModel.countDocuments({}),
    ]);
    return { createdCount, publishedCount, answerCount };
  }
}
