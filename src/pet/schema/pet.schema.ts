import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type PetDocument = Pet & Document;

enum Genre {
  Atk = 'ATK',
  Hp = 'HP',
  Shield = 'Shield',
  EXP = 'EXP',
  Speed = 'SPEED',
  Lucky = 'LUCKY',
}

interface Buff {
  name: [Genre];
  percent: number;
}

@Schema({
  timestamps: true,
})
export class Pet {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  status: string;

  @Prop({ required: true, min: 0 })
  dame: number;

  @Prop({ required: true })
  cooldown: number;

  @Prop({ required: true, default: 10 })
  crit: number;

  @Prop({ required: true })
  buff: Buff;

  @Prop({ required: true })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(Pet);
