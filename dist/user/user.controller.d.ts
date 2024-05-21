/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.user.dto';
import { ImageDto } from './dto/uploade.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(body: CreateUserDto): Promise<{
        StatusCode: HttpStatus;
        message: string;
        Data: {
            id: number;
            username: string;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
            role: string;
            roles: string[];
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        StatusCode: HttpStatus;
        message: string;
        data: {
            token: string;
        };
    }>;
    GetAllUser(): Promise<{
        StatusCode: HttpStatus;
        message: string;
        Data: {
            id: number;
            username: string;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
            role: string;
            roles: string[];
        }[];
    }>;
    findOne(id: number): Promise<{
        StatusCode: HttpStatus;
        message: string;
        Data: {
            id: number;
            username: string;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
            role: string;
            roles: string[];
        };
    }>;
    CreateUser(createUserDto: CreateUserDto): Promise<{
        StatusCode: HttpStatus;
        message: string;
        Data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    SerchingUser(search: string): Promise<{
        StatusCode: HttpStatus;
        message: string;
        Data: {
            id: number;
            username: string;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
            role: string;
            roles: string[];
        }[];
    }>;
    uploadFile(file: Express.Multer.File, body: ImageDto): Promise<{
        message: string;
        file: {
            id: number;
            url: string;
        };
    }>;
    uploadFiles(file: Express.Multer.File): Promise<{
        message: string;
        statusCode: number;
        url: string;
    }>;
    GetUrl(key: string): Promise<any>;
}
