import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: String, required: true, unique: true, index: true })
  documentNumber!: string;

  @Prop({ type: String, required: true })
  fullName!: string;

  @Prop({ type: String, unique: true, sparse: true })
  email?: string;

  @Prop({ type: String, required: true })
  city!: string;

  @Prop({ type: Number, required: true })
  monthlyIncome!: number;

  @Prop({ type: String, required: true })
  passwordHash!: string;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
