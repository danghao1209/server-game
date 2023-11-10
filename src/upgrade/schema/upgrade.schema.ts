import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UpgradeDocument = Upgrade & Document;

enum Genre {
  Atk = 'ATK',
  Hp = 'HP',
  Armor = 'ARMOR',
  EXP = 'EXP',
  SpeedRun = 'SPEEDRUN',
  SpeedATK = 'SPEEDATK',
  Cooldown = 'COOLDOWN',
  Pet = 'PET',
  Crit = 'CRIT',
  CritDame = 'CRITDAME',
  HealthUpLevel = 'HEALTHUPLEVEL',
}

export interface Buff {
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
  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  upgradeLevel: number;

  @Prop({ required: true, type: String })
  type: Genre;

  @Prop({ required: true, type: Number })
  numberOrPercent: number;

  @Prop({ required: true, type: Boolean })
  isPercent: boolean;

  @Prop({ required: true, type: Number })
  coinCost: number;
}

export const UpgradeSchema = SchemaFactory.createForClass(Upgrade);
