import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AdminDocument = Admin & Document;
@Schema({
  timestamps: true,
})
export class Admin {
  @Prop({
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id: mongoose.Types.ObjectId; // Thêm trường _id vào schema

  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 0, min: 0 })
  coin: number;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Comic' }] })
  like: [mongoose.Types.ObjectId];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Author' }] })
  subscribe: [mongoose.Types.ObjectId];

  @Prop({ default: false })
  vip: boolean;
}

export const UserSchema = SchemaFactory.createForClass(Admin);
