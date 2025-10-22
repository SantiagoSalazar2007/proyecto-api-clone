import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

//se definen los endpoints usando las funciones declaradas en el service
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // se valida la peticion http con un token jwt
  //devuelve todos los usuarios
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  //se obtiene usuario por id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  // se elimina usuario por id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    if (!result) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return { message: 'Usuario eliminado correctamente' };
  }
}
