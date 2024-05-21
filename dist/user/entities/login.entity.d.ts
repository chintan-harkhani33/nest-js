export declare class TokenDto {
    token: string;
}
export declare class LoginSuucessDto {
    statusCode: number;
    message: string;
    data: TokenDto;
}
export declare class ErrorLoginDto {
    statusCode: number;
    error: string;
}
