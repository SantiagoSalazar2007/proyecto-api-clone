import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    //se injecta el modelo de usuario y se sete privado usando jwt
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //se crea la funcion register con la contraseña hashed (transformar el texto con matematicas raritas)
  async register(username: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, email, password: hashed });
    return user.save();
  }
  
  //se crea la funcion login y revisa cada parametro
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: user._id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  //devuelve el perfil sin la contraseña
  async profile(userId: string) {
    return this.userModel.findById(userId).select('-password');
  }
}
