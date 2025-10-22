import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './schemas/order.schema';
import { Cart } from '../cart/schemas/cart.schema';

@Injectable()
export class OrdersService {
  constructor(

    //Inyectamos el modelo de moongoDB de 'Order' y 'Cart'
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  //crear orden basada en el carrito del usuario
  async createOrderFromCart(userId: string) {
    // buscamos el carrito del usuario
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.product'); // para acceder a detalles del producto

    if (!cart || cart.items.length === 0) {
      throw new Error('El carrito está vacío o no existe.');
    }

    // calculamos el total
    const total = cart.items.reduce((acc, item) => {
      const price = (item.product as any).price || 0;
      return acc + item.quantity * price;
    }, 0);

    // creamos la orden con los datos correctos
    const order = new this.orderModel({
      user: new Types.ObjectId(userId), // se obtiene el id del usuario
      items: cart.items.map(item => ({ // array de items en el carrito
        productId: (item.product as any)._id, // el id del producto
        name: (item.product as any).name || 'Producto sin nombre', //el nombre del producto o en caso que no tenga, 'producto sin nombre'
        price: (item.product as any).price || 0, // el precio del producto o en caso que no tenga se coloca 0
        quantity: item.quantity,
      })),
      total,
      status: 'pendiente', // valor por defecto opcional
    });

    await order.save();

    // 🧹 Vaciar carrito después de crear la orden
    cart.items = [];
    await cart.save();

    return order;
  }

  // 📦 Obtener todas las órdenes del usuario
  async getUserOrders(userId: string) {
    return this.orderModel
      .find({ user: userId }) // ✅ tu schema usa 'user'
      .sort({ createdAt: -1 });
  }

  // 🗑️ Eliminar todas las órdenes del usuario
  async deleteUserOrders(userId: string) {
    return this.orderModel.deleteMany({ user: userId }); // ✅ tu schema usa 'user'
  }
}
