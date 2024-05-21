import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
export declare class AuthGard implements CanActivate {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(data: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
