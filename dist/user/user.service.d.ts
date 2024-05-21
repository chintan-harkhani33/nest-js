/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.user.dto';
import { ImageDto } from './dto/uploade.dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly configService;
    private region;
    private s3;
    private s3S;
    constructor(prismaService: PrismaService, jwtService: JwtService, configService: ConfigService);
    Ragister(createUserDto: CreateUserDto): Promise<{
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
    Login(loginDto: LoginDto): Promise<{
        StatusCode: HttpStatus;
        message: string;
        data: {
            token: string;
        };
    }>;
    findAll(): Promise<{
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
    UserCreateFaker(createUserDto: CreateUserDto): Promise<{
        StatusCode: HttpStatus;
        message: string;
        Data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    searchUsers(search: string): Promise<{
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
    uploadFile(file: Express.Multer.File, Body: ImageDto): Promise<{
        message: string;
        file: {
            id: number;
            url: string;
        };
    }>;
    Uplode(file: Express.Multer.File, key: string, FolderName: string): Promise<{
        message: string;
        statusCode: number;
        url: string;
    }>;
    generatePresignedUrl(key: string): Promise<any>;
    private getPresignedUrl;
}
