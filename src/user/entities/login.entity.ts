import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    description: 'User token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
export class LoginSuucessDto {
  @ApiProperty({ description: 'statusCode', example: 200 })
  statusCode: number;

  @ApiProperty({
    description: 'meassage',
    example: '  User login successFully !',
  })
  message: string;
  @ApiProperty({
    description: 'Data containing user token',
    type: TokenDto,
  })
  data: TokenDto;
}


export class ErrorLoginDto {  
  @ApiProperty({ description: 'statusCode', example: 400 })
  statusCode: number;
  @ApiProperty({description :"Error", example : "User not found"})
  error :string
}

