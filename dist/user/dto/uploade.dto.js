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
exports.ErrorImageOneDto = exports.SuccessIamgeResponse = exports.ImagesuccessDto = exports.ImageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ImageDto {
}
exports.ImageDto = ImageDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ImageDto.prototype, "url", void 0);
class ImagesuccessDto {
}
exports.ImagesuccessDto = ImagesuccessDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Image id", example: 1 }),
    __metadata("design:type", Number)
], ImagesuccessDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Image", example: "http://localhost:3000/images.jpg" }),
    __metadata("design:type", String)
], ImagesuccessDto.prototype, "url", void 0);
class SuccessIamgeResponse {
}
exports.SuccessIamgeResponse = SuccessIamgeResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "statusecode", example: 201 }),
    __metadata("design:type", Number)
], SuccessIamgeResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "message", example: "Image uploaded successfully" }),
    __metadata("design:type", String)
], SuccessIamgeResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "url", type: ImagesuccessDto }),
    __metadata("design:type", String)
], SuccessIamgeResponse.prototype, "file", void 0);
class ErrorImageOneDto {
}
exports.ErrorImageOneDto = ErrorImageOneDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'statusCode', example: 404 }),
    __metadata("design:type", Number)
], ErrorImageOneDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error", example: "File is not Uploade" }),
    __metadata("design:type", String)
], ErrorImageOneDto.prototype, "error", void 0);
//# sourceMappingURL=uploade.dto.js.map