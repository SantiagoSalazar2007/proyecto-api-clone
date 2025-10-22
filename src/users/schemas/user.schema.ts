  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { Document, Types } from 'mongoose';

  export type UserDocument = User & Document;

  //Se usa timestamps para que quede registro de la fecha de creacion y actualizacion en mongoDB 
  @Schema({ timestamps: true })
  export class User {

    //el username, el email y la contraseña son de tipo string, son requeridos y deben ser unicos
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    //el carrito es un array de productos donde cada producto lleva su id y cantidad
    @Prop({ type: [{ product: { type: Types.ObjectId, ref: 'Product' }, quantity: Number }] , default: [] })
    cart: { product: Types.ObjectId; quantity: number }[];

    //se guardan las ordenes por id
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }], default: [] })
    orders: Types.ObjectId[];
  }

  //se exporta el esquema del usuario 
  export const UserSchema = SchemaFactory.createForClass(User);
