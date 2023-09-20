import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type CharacterDocument = Character & Document;

@Schema({
  timestamps: true,
})
export class Character {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  status: string;

  @Prop({ required: true, min: 0 })
  dame: number;

  @Prop({ required: true, min: 0 })
  cooldown: number;

  @Prop({ required: true, default: 10, min: 0 })
  crit: number;

  @Prop({ required: true, default: 0, min: 0 })
  hp: number;

  @Prop({ required: true, default: 0, min: 0 })
  shield: number;

  @Prop({ required: true, default: 0, min: 0 })
  speed: number;

  @Prop({ required: true, default: 0, min: 0 })
  healing: number;

  @Prop({ required: true, default: 0, min: 0 })
  exp: number;

  @Prop({ required: true, default: 0, min: 0 })
  lucky: number;

  @Prop({ required: true })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(Character);
