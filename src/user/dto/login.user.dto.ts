import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'User email address',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'email is not valid' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

