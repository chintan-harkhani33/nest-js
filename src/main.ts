import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './swgger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(path.join(__dirname, '../src/uploads'));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // const configService = app.get(ConfigService);
  // const port = configService.get(process.env.PORT);
  await app.listen(process.env.PORT);
  logger.debug(
    `🚀 Server is running on port: http://localhost:${process.env.PORT}`,
  );
}
bootstrap();
