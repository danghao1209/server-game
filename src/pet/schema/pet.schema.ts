import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type PetDocument = Pet & Document;

@Schema({
  timestamps: true,
})
export class Pet {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true, type: Number })
  star: number;

  @Prop({ required: true, min: 0, type: Number })
  atk: number;

  @Prop({ required: true, type: Number })
  cooldown: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  atkBuff: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  critBuff: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  speedRunBuff: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  speedAttachBuff: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  hpBuff: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  dameCritBuff: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  armorBuff: number;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
