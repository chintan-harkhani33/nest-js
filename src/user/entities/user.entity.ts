import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntitny implements User {
  @ApiProperty({ description: 'Primary Key as id', example: '1' })
  id: number;
  @ApiProperty({ description: 'User Name', example: 'chintu123' })
  username: string;
  @ApiProperty({ description: 'User FirstName', example: 'Harkhani' })
  firstname: string;
  @ApiProperty({ description: 'User LastName', example: 'Chintan' })
  lastname: string;
  @ApiProperty({ description: 'User Email', example: 'chintu@gmail.com' })
  // @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Hased User Password',
    example: '$2b$10$AIJyW/WoAzV5Br5QZ5Y1lO6vxlUqLwImv6/uaUJrkgUUKO3C46HJ6',
  })
  password: string;

  @ApiProperty({ description: 'User Role', example: 'admin' })
  role: string;

  @ApiProperty({description : "User Multiple ROles ", example :["user , admin , subAdmin"]})
  roles: string[];
}

export class ResponseDto {
  @ApiProperty({ description: 'Status Code', example: 201 })
  statusCode: number;
  @ApiProperty({ description: 'Message', example: 'User Created Successfully' })
  message: string;
  @ApiProperty({ description: 'Data', type: UserEntitny })
  data: any;
}

export class ErrorRegisterDto {
  @ApiProperty({ description: 'Status Code', example: 'User Already Exist' })
  message: string;
  @ApiProperty({ description: 'Message', example: 'Bad Request' })
  error: string;
  @ApiProperty({ description: 'Status Code', example: 400 })
  statusCode: number;
}

export class countDto {
  @ApiProperty({
    description: 'COunt Data',
    example: '100',
  })
  count: string;
}
export class FakeResponseDto {
  @ApiProperty({ description: 'Status Code', example: 201 })
  statusCode: number;
  @ApiProperty({ description: 'Message', example: 'User Created Successfully' })
  message: string;
  @ApiProperty({ description: 'Data', type: countDto })
  data: countDto;
}
