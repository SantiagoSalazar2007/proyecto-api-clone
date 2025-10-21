import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/products')
  ],

})
export class AppModule {}
