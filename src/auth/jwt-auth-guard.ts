import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//necesario para la proteccion de las peticiones http

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
