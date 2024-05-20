import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleGard implements CanActivate {
  constructor(private reflector: Reflector) {}

  MatchRoles(roles: string[], UserRole: string) {
    return roles.some((roles) => roles === UserRole);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.user.roles);
    
    const userRole = request.user?.roles;
    return this.MatchRoles(roles, userRole);
  }
}


@Injectable()
export class MutiRoleGard implements CanActivate {
  constructor(private reflector: Reflector) {}

  MatchRoles(roles: string[], UserRole: string[]|undefined):boolean {
    if (!UserRole) {
      return false;
    }
// console.log(UserRole.some(UserRole => roles.includes(UserRole)));

   return UserRole.some(UserRole => roles.includes(UserRole));
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // console.log(request.user.roles);704
    
    const userRole = request.user?.roles;
    // console.log(userRole);
    
    return this.MatchRoles(roles, userRole);
  }
}
