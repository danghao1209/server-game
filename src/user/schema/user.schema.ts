import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Character } from 'src/character/schema/character.schema';
import { Pet } from 'src/pet/schema/pet.schema';
import { Upgrade } from 'src/upgrade/schema/upgrade.schema';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0, min: 0 })
  coin: number;

  @Prop({ default: 0, min: 0 })
  gem: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comic' }] })
  pet: Pet[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }] })
  subscribe: Upgrade[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comic' }] })
  character: Character[];
}

export const UserSchema = SchemaFactory.createForClass(User);
