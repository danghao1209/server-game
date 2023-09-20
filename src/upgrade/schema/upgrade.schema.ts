import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UpgradeDocument = Upgrade & Document;

enum Genre {
  Atk = 'ATK',
  Hp = 'HP',
  Shield = 'Shield',
  EXP = 'EXP',
  Speed = 'SPEED',
}

interface Buff {
  name: Genre;
  properties: {
    number: number;
    percent: number;
  };
}

@Schema({
  timestamps: true,
})
export class Upgrade {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  buff: Buff;

  @Prop({ required: true })
  upgradeFloor: number;
}

export const UserSchema = SchemaFactory.createForClass(Upgrade);
