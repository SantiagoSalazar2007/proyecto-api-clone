// src/purchases/schemas/purchase.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Purchase extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 'active' })
  status: 'active' | 'cancelled';
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
