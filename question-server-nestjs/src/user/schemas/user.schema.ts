import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>

@Schema(
    
)
export class User{
    @Prop({required: true, unique: true})
    username: string;
    @Prop({required: true})
    password: string;
    @Prop()
    nickname: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
