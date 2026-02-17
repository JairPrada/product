import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductType = 'savings' | 'credit' | 'loan';
export type ProductStatus = 'active' | 'pending' | 'inactive';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, enum: ['savings', 'credit', 'loan'] })
  type!: ProductType;

  @Prop()
  description?: string;

  @Prop()
  accountNumber?: string;

  @Prop({ default: '$0' })
  balance!: string;

  @Prop()
  limit?: string;

  @Prop({
    required: true,
    enum: ['active', 'pending', 'inactive'],
    default: 'pending',
  })
  status!: ProductStatus;

  @Prop()
  rate?: string;

  @Prop()
  lastMovement?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId?: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Index for querying products by user
ProductSchema.index({ userId: 1, status: 1 });
