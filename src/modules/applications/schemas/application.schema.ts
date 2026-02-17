import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ApplicationStatus = 'pending_otp' | 'approved' | 'rejected' | 'in_review';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true, collection: 'applications' })
export class Application {
  @Prop({ required: true, index: true })
  documentNumber!: string;

  @Prop({ required: true })
  acceptsDataTreatment!: boolean;

  @Prop({ required: true, enum: ['pending_otp', 'approved', 'rejected', 'in_review'], default: 'pending_otp' })
  status!: ApplicationStatus;

  @Prop()
  message?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId?: Types.ObjectId;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

// Compound index for querying
ApplicationSchema.index({ documentNumber: 1, status: 1 });
