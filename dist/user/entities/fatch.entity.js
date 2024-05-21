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
exports.ErrorFetchOneDto = exports.FetchOneDataDto = exports.ErrorFetchDto = exports.FatchDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
class FatchDataDto {
}
exports.FatchDataDto = FatchDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "StatusCode", example: 200 }),
    __metadata("design:type", Number)
], FatchDataDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message", example: "SuccessFully Fetch Data" }),
    __metadata("design:type", String)
], FatchDataDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Data", type: user_entity_1.UserEntitny, isArray: true }),
    __metadata("design:type", Object)
], FatchDataDto.prototype, "data", void 0);
class ErrorFetchDto {
}
exports.ErrorFetchDto = ErrorFetchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'statusCode', example: 404 }),
    __metadata("design:type", Number)
], ErrorFetchDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error", example: "Unothorization" }),
    __metadata("design:type", String)
], ErrorFetchDto.prototype, "error", void 0);
class FetchOneDataDto {
}
exports.FetchOneDataDto = FetchOneDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "StatusCode", example: 200 }),
    __metadata("design:type", Number)
], FetchOneDataDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message", example: "SuccessFully Fetch Data" }),
    __metadata("design:type", String)
], FetchOneDataDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Data", type: user_entity_1.UserEntitny }),
    __metadata("design:type", Object)
], FetchOneDataDto.prototype, "data", void 0);
class ErrorFetchOneDto {
}
exports.ErrorFetchOneDto = ErrorFetchOneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'statusCode', example: 404 }),
    __metadata("design:type", Number)
], ErrorFetchOneDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error", example: "User Not Found" }),
    __metadata("design:type", String)
], ErrorFetchOneDto.prototype, "error", void 0);
//# sourceMappingURL=fatch.entity.js.map