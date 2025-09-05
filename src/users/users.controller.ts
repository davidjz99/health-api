import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

//     @Post('login')
//     async login(@Body() body: LoginUserDto) {
//         const user = await this.usersService.findByEmail(body.email);

//         if (!user || user.password !== body.password) {
//         throw new UnauthorizedException('Email o contraseña incorrectos');
//         }

//         const { password, ...newUser } = user;

//         return { message: 'Login exitoso', newUser };
//   }

//   @Post('register')
//   async register(@Body() body: CreateUserDto) {
//     const newUser = await this.usersService.create(body);
//     return newUser;
//   }
  
}
