import { Controller, Get, Param } from '@nestjs/common'; 
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

    //Se crea el constructor con un atributo privado y de solo lectura
    constructor(private readonly productsService: ProductsService) {}

    @Get()

    //metodo que devuelve un array de productos
    async GetAll(): Promise<Product[]> {
        return this.productsService.productList();
    }

    @Get(':id')
    async getOne(@Param('id') id:string): Promise<Product> {
        return this.productsService.specificProduct(id);
    }
}
