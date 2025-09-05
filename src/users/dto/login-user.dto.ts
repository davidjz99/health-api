import { IsEmail, IsNumber, IsString, IsOptional } from 'class-validator';

export class LoginUserDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}