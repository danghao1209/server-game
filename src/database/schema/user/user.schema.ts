import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  coin: number;

  @Prop([String])
  listUpgrade: string[];

  @Prop([String])
  listPet: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
