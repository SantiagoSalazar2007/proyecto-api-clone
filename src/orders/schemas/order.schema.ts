import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

class OrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ productId: Types.ObjectId, name: String, price: Number, quantity: Number }], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  total: number;

  @Prop()
  status: string; 
}

export const OrderSchema = SchemaFactory.createForClass(Order);
