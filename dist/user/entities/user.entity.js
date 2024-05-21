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
exports.FakeResponseDto = exports.countDto = exports.ErrorRegisterDto = exports.ResponseDto = exports.UserEntitny = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserEntitny {
}
exports.UserEntitny = UserEntitny;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Primary Key as id', example: '1' }),
    __metadata("design:type", Number)
], UserEntitny.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User Name', example: 'chintu123' }),
    __metadata("design:type", String)
], UserEntitny.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User FirstName', example: 'Harkhani' }),
    __metadata("design:type", String)
], UserEntitny.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User LastName', example: 'Chintan' }),
    __metadata("design:type", String)
], UserEntitny.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User Email', example: 'chintu@gmail.com' }),
    __metadata("design:type", String)
], UserEntitny.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hased User Password',
        example: '$2b$10$AIJyW/WoAzV5Br5QZ5Y1lO6vxlUqLwImv6/uaUJrkgUUKO3C46HJ6',
    }),
    __metadata("design:type", String)
], UserEntitny.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User Role', example: 'admin' }),
    __metadata("design:type", String)
], UserEntitny.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User Multiple ROles ", example: ["user , admin , subAdmin"] }),
    __metadata("design:type", Array)
], UserEntitny.prototype, "roles", void 0);
class ResponseDto {
}
exports.ResponseDto = ResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status Code', example: 201 }),
    __metadata("design:type", Number)
], ResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message', example: 'User Created Successfully' }),
    __metadata("design:type", String)
], ResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data', type: UserEntitny }),
    __metadata("design:type", Object)
], ResponseDto.prototype, "data", void 0);
class ErrorRegisterDto {
}
exports.ErrorRegisterDto = ErrorRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status Code', example: 'User Already Exist' }),
    __metadata("design:type", String)
], ErrorRegisterDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message', example: 'Bad Request' }),
    __metadata("design:type", String)
], ErrorRegisterDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status Code', example: 400 }),
    __metadata("design:type", Number)
], ErrorRegisterDto.prototype, "statusCode", void 0);
class countDto {
}
exports.countDto = countDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'COunt Data',
        example: '100',
    }),
    __metadata("design:type", String)
], countDto.prototype, "count", void 0);
class FakeResponseDto {
}
exports.FakeResponseDto = FakeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status Code', example: 201 }),
    __metadata("design:type", Number)
], FakeResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message', example: 'User Created Successfully' }),
    __metadata("design:type", String)
], FakeResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data', type: countDto }),
    __metadata("design:type", countDto)
], FakeResponseDto.prototype, "data", void 0);
//# sourceMappingURL=user.entity.js.map