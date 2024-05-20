import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, UserModule,
    
    ConfigModule.forRoot({isGlobal:true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
