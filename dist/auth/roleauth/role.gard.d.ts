import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class RoleGard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    MatchRoles(roles: string[], UserRole: string): boolean;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export declare class MutiRoleGard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    MatchRoles(roles: string[], UserRole: string[] | undefined): boolean;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
