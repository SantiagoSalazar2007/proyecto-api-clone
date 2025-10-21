import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {

    //Se instancia el constructos para crear los objetos producto
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    // Se crea metodo async (quiere decir que siempre devolvera una promesa 'promise' ya que el acceso a la B.D es asincrono) para obtener todos los productos
    async productList(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    // Se obtiene un producto por su ID
    async specificProduct(id: string): Promise<Product>  {
        const product = await this.productModel.findById(id).exec();

        //Si el producto no es encontrado, para evitar retornar un NULL se crea este throw
        if (!product) {
            throw new Error('El producto con el id ${id} no fue encontrado');
        }
        return product;
    }
}

