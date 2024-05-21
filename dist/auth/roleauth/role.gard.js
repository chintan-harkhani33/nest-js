"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutiRoleGard = exports.RoleGard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RoleGard = class RoleGard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    MatchRoles(roles, UserRole) {
        return roles.some((roles) => roles === UserRole);
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        console.log(request.user.roles);
        const userRole = request.user?.roles;
        return this.MatchRoles(roles, userRole);
    }
};
exports.RoleGard = RoleGard;
exports.RoleGard = RoleGard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleGard);
let MutiRoleGard = class MutiRoleGard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    MatchRoles(roles, UserRole) {
        if (!UserRole) {
            return false;
        }
        return UserRole.some(UserRole => roles.includes(UserRole));
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const userRole = request.user?.roles;
        return this.MatchRoles(roles, userRole);
    }
};
exports.MutiRoleGard = MutiRoleGard;
exports.MutiRoleGard = MutiRoleGard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], MutiRoleGard);
//# sourceMappingURL=role.gard.js.map