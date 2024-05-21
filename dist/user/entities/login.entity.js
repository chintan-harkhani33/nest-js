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
exports.ErrorLoginDto = exports.LoginSuucessDto = exports.TokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TokenDto {
}
exports.TokenDto = TokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokenDto.prototype, "token", void 0);
class LoginSuucessDto {
}
exports.LoginSuucessDto = LoginSuucessDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'statusCode', example: 200 }),
    __metadata("design:type", Number)
], LoginSuucessDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'meassage',
        example: '  User login successFully !',
    }),
    __metadata("design:type", String)
], LoginSuucessDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data containing user token',
        type: TokenDto,
    }),
    __metadata("design:type", TokenDto)
], LoginSuucessDto.prototype, "data", void 0);
class ErrorLoginDto {
}
exports.ErrorLoginDto = ErrorLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'statusCode', example: 400 }),
    __metadata("design:type", Number)
], ErrorLoginDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error", example: "User not found" }),
    __metadata("design:type", String)
], ErrorLoginDto.prototype, "error", void 0);
//# sourceMappingURL=login.entity.js.map