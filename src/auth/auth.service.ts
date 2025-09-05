import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: LoginUserDto): Promise<any> {
    const userBd = await this.usersService.findByEmail(user.email);
    if (!userBd) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(user.password, userBd.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const { password, ...result } = userBd;
    return result;
  }

  async login(user: LoginUserDto) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password!, salt);
    const newUser: CreateUserDto = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
    const { password, ...result } = newUser;
    return result;
  }
}
