"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.config = new swagger_1.DocumentBuilder()
    .setTitle('UserSystem example')
    .setDescription('The User System API description')
    .setVersion('1.0')
    .addTag('User')
    .addBearerAuth()
    .build();
//# sourceMappingURL=swgger.config.js.map