//Se usa 'PartialType' para evitar repetir campos que no necesitan ser actualizados cuando necesitamos actualizar un producto
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

