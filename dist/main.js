"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path = require("path");
const swagger_1 = require("@nestjs/swagger");
const swgger_config_1 = require("./swgger.config");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useStaticAssets(path.join(__dirname, '../src/uploads'));
    const document = swagger_1.SwaggerModule.createDocument(app, swgger_config_1.config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT);
    logger.debug(`🚀 Server is running on port: http://localhost:${process.env.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map