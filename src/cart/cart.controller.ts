import { Controller, Get, Post, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

//se definen los endpoints usando las funciones declaradas en el service
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  addToCart(@Req() req, @Body() body: any) {
    return this.cartService.addToCart(req.user.userId, body.productId, body.quantity);
  }

  @Delete('remove/:id')
  remove(@Req() req, @Param('id') id: string) {
    return this.cartService.removeFromCart(req.user.userId, id);
  }
}
