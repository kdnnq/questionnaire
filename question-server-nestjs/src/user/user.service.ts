import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
    // 依赖注入
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async create(userData: CreateUserDto){
        const createdUser = new this.userModel(userData)
        return await createdUser.save()
    }

    async findOne(username:string,password:string){
        return await this.userModel.findOne({username,password})
    }
}
