import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export  class  ImageDto{
    @IsNotEmpty()
    url:string
}

export class ImagesuccessDto {
    @ApiProperty({description : "Image id", example: 1})
    id:number
    @ApiProperty({description : "Image", example:"http://localhost:3000/images.jpg"})
    url :string ;
}

export class SuccessIamgeResponse {
    @ApiProperty({description : "statusecode", example :201})
    statusCode :number;
    @ApiProperty({description : "message", example :"Image uploaded successfully"})
    message : string;
    @ApiProperty({description : "url", type:ImagesuccessDto})
    file :   string
}

export class ErrorImageOneDto {
    @ApiProperty({ description: 'statusCode', example: 404 })
    statusCode: number;
    @ApiProperty({description :"Error", example : "File is not Uploade"})
    error :string
}