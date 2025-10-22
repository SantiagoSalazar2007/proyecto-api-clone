import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ProductsService {
  constructor(

    //se injecta el modelo de moongoDB
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  //crear el producto
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  //obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  //obtener producto por ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  //actualizar el producto
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
      
    //en caso de que no encuentre el producto
    if (!updated) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return updated;
  }

  //eliminar el producto
  async remove(id: string): Promise<Product> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return deleted;
  }

  //agregar comentario al producto
  async addComment(productId: string, createCommentDto: CreateCommentDto): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();

    //en caso de que no se encuentre el producto
    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    const comment = {
      userId: new Types.ObjectId(createCommentDto.userId),
      username: createCommentDto.username,
      content: createCommentDto.content,
    };

    product.comments.push(comment);
    return product.save();
  }
}
