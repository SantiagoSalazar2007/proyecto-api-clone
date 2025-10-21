//Se importan decoradores y utilidades del parquete mongoose
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Se crea un alias de TypeScript a la interseccion entre la clase Product y la clase Document (esta ultima proviene de mongoose)
export type ProductDocument = Product & Document;

//este decorador marca la clase 'Product' como un Schema de mongoose 
@Schema()
export class Product 
{
    //se aplica decorador y Mongoose validara que ese campo exista al crear o guardar document
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    //Mongoose validara que ese campo exista al crear o guardar document
    @Prop({ required: true })
    price: number;

    @Prop()
    stock: number;
}

// Se exporta la clase decorada Product en un Schema de Mongoose (ProductSchema)
export const ProductSchema = SchemaFactory.createForClass(Product);
