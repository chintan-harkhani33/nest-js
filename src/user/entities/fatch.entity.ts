import { ApiProperty } from "@nestjs/swagger";
import { UserEntitny } from "./user.entity";

export class FatchDataDto {
    @ApiProperty({description :"StatusCode", example: 200})
    statusCode: number;
    @ApiProperty({description :"Message", example: "SuccessFully Fetch Data"})
    message :string;
    @ApiProperty({description :"Data",type : UserEntitny , isArray:true})
    data :any;
}

export class ErrorFetchDto {  
    @ApiProperty({ description: 'statusCode', example: 404 })
    statusCode: number;
    @ApiProperty({description :"Error", example : "Unothorization"})
    error :string
  }
export class FetchOneDataDto {
    @ApiProperty({description :"StatusCode", example: 200})
    statusCode: number;
    @ApiProperty({description :"Message", example: "SuccessFully Fetch Data"})
    message :string;
    @ApiProperty({description :"Data",type : UserEntitny })
    data :any;
}

export class ErrorFetchOneDto {
    @ApiProperty({ description: 'statusCode', example: 404 })
    statusCode: number;
    @ApiProperty({description :"Error", example : "User Not Found"})
    error :string
}