import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(@User() user) {
        const userBd = await this.usersService.findById(user.userId); 
        const { password, ...result } = userBd;
        return result;
    }
  
}
