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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVCVALIDATEIn = void 0;
const common_1 = require("@nestjs/common");
let AVCVALIDATEIn = class AVCVALIDATEIn {
    constructor(options) {
        this.fromTimestamp = options?.fromTimestamp !== undefined ? options.fromTimestamp : true;
        this.fromDate = options?.fromDate || 'Invalid date';
    }
    transform(value, metadata) {
        const { data: isKeyGiven } = metadata;
        if (isKeyGiven) {
            value = value;
        }
        else {
            value = value['timestamp'];
        }
        const date = this.fromTimestamp
            ? this.converTime(value)
            : new Date(value);
        console.log(date);
        if (!date || isNaN(+date)) {
            const errorMessage = isKeyGiven ? `${isKeyGiven} is valid date` : this.fromDate;
            throw new common_1.BadRequestException(errorMessage);
        }
        const { metatype } = metadata;
        switch (metatype) {
            case String:
                return date.toUTCString();
            case Date:
                return date;
            case Number:
                return date.getTime();
            default:
                return date.toISOString();
        }
    }
    converTime(timestamp) {
        timestamp = +timestamp;
        const Issecounds = !(timestamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);
        return Issecounds ? new Date(timestamp * 1000) : new Date(timestamp);
    }
};
exports.AVCVALIDATEIn = AVCVALIDATEIn;
exports.AVCVALIDATEIn = AVCVALIDATEIn = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object])
], AVCVALIDATEIn);
//# sourceMappingURL=validation.pipe.js.map