import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './schemas/purchase.schema';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(@InjectModel(Purchase.name) private purchaseModel: Model<Purchase>) {}

  async create(dto: CreatePurchaseDto): Promise<Purchase> {
    const created = new this.purchaseModel(dto);
    return created.save();
  }

  async cancel(id: string): Promise<Purchase> {
    const purchase = await this.purchaseModel.findById(id);
    if (!purchase) throw new NotFoundException('Compra no encontrada');

    const diffMinutes = (Date.now() - purchase.createdAt.getTime()) / 60000;
    if (diffMinutes > 5) throw new BadRequestException('Tiempo de cancelación expirado');

    purchase.status = 'cancelled';
    return purchase.save();
  }
}

