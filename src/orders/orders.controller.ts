import { Controller, Post, Get, Delete, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

//se definen los endpoints usando las funciones declaradas en el service
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Req() req) {
    const userId = req.user.userId;
    return this.ordersService.createOrderFromCart(userId);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserOrders(@Req() req) {
    const userId = req.user.userId;
    return this.ordersService.getUserOrders(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteOrders(@Req() req) {
    const userId = req.user.userId;
    return this.ordersService.deleteUserOrders(userId);
  }
}
