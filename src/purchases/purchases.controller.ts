import { Controller, Post, Param, Body } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}

  @Post()
  create(@Body() dto: CreatePurchaseDto) {
    return this.service.create(dto);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }
}

