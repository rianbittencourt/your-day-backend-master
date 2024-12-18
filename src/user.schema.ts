// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  nationality: string;

  @Prop()
  googleID: string;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop()
  birthday: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 0 })
  amountPost: number;

  @Prop({ default: 0 })
  amountReading: number;

  @Prop()
  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
