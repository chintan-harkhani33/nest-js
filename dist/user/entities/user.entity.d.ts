import { User } from '@prisma/client';
export declare class UserEntitny implements User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    roles: string[];
}
export declare class ResponseDto {
    statusCode: number;
    message: string;
    data: any;
}
export declare class ErrorRegisterDto {
    message: string;
    error: string;
    statusCode: number;
}
export declare class countDto {
    count: string;
}
export declare class FakeResponseDto {
    statusCode: number;
    message: string;
    data: countDto;
}
