import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Question, QuestionDocument } from './schema/question.schema.js'
import { nanoid } from 'nanoid';

@Injectable()
export class QuestionService {
    constructor(
        // 依赖注入
        @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
    ){}

    // 校验 ID 是否为有效的 MongoDB ObjectId
    private validateObjectId(id: string): void {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundException(`问卷 id "${id}" 格式无效`);
        }
    }

    // 创建
   async create(username: string){
    const question = new this.questionModel({
        title: 'title' + Date.now(),
        desc: 'desc',
        author: username,
        componentList: [{
            fe_id: nanoid(),
            type: "questionInfo",
            title: '问卷信息',
            props: {title: '问卷标题', desc: '问卷描述...'}
        }]
    })
    return await question.save()
   }
   
   //删除
   async delete(id: string,author: string){
    this.validateObjectId(id);
    return await this.questionModel.findOneAndDelete(
       {
         _id: id,
        author
       }
    )
   }
   async deleteMany(ids: string[],author: string){
    const validIds = ids.filter(id => mongoose.isValidObjectId(id));
    return await this.questionModel.deleteMany(
       {
         _id: {$in: validIds},
        author
       }
    )
   }

   //更新  
   async update(id: string, updateData:any, author: string){
    this.validateObjectId(id);
    return await this.questionModel.updateOne({_id: id,  author}, updateData)
   }

   //查找    
   async findOne(id: string){
    this.validateObjectId(id);
    return await this.questionModel.findById(id);
   }
   async findAllList({
    keyword = '',
    page = 1, 
    pageSize = 10,
    isDeleted = false,
    isStar,
    author = ''
}: {
    keyword?: string;
    page?: number;
    pageSize?: number;
    isDeleted?: boolean;
    isStar?: boolean;
    author?: string;
}){
    const whereOpt: any = {
        author,
        isDeleted
    }
    if(isStar != null) whereOpt.isStar = isStar
    if(keyword){
        const reg = new RegExp(keyword, 'i')
        whereOpt.title = {$regex: reg}
    }
    return await this.questionModel.find(whereOpt)
    .find(whereOpt)
    .sort({_id: -1})
    .skip((page - 1)* pageSize)
    .limit(pageSize); 
   }

   async countAll({
    keyword = '',
    isDeleted = false, 
    isStar,
    author =''
    
}: {
    keyword?: string;
    isDeleted?: boolean;
    isStar?: boolean;
    author?: string;
}){
    const whereOpt: any = {
        author,
        isDeleted
    }
    if(isStar != null) whereOpt.isStar = isStar
    if(keyword){
        const reg = new RegExp(keyword, 'i')
        whereOpt.title = {$regex: reg}
    }
    return await this.questionModel.countDocuments(whereOpt)
   }

   async duplicate(id: string, author: string){
    this.validateObjectId(id);
    const question = await this.questionModel.findById(id)
    if (!question) {
        throw new NotFoundException(`问卷 (id: ${id}) 不存在`);
    }
    const newQuestion = new this.questionModel({
        ...question.toObject(),
        _id: new mongoose.Types.ObjectId(),
        title: question.title + '副本',
        author,
        isPublished: false,
        isStar: false,
        componentList: question?.componentList.map((item) => {
            return{
                ...item,
                fe_id:nanoid()
            }
        })
    })
    return await newQuestion.save()
   }
}
