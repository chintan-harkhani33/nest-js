import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsIn, IsArray } from 'class-validator';
import { MULTIROLES, ROLES } from '../../shared/constants/globle.constrant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({description : "Username of the user", example : "Chintu_123"})
  @IsString()
  @IsNotEmpty()
  username:string;

  @ApiProperty({description : "Firstname of the user", example : "Harkhani"})
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({description : "Lastname of the user", example : "Chintan"})
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({description : "Unique Email of the user", example : "harkhanichintan@123"})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description : "Password must be strong of the user", example : "Chintan@123&&" ,format:'password'})
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({description : "Role of the Must be on admin ,user ,guest ", example : "admin" ,format:'role'})
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ROLES))
  role: string;
 
  // @ApiProperty({description : "User Multiple  Roles ", example : "admin,user" ,format:'roles'})
  @IsArray()
  @IsNotEmpty()
  @IsIn(Object.values(MULTIROLES) , {each :true})
 roles : string[];


}

