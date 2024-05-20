import { DocumentBuilder } from "@nestjs/swagger";


export const config = new DocumentBuilder()
.setTitle('UserSystem example')
.setDescription('The User System API description')
.setVersion('1.0')
.addTag('User')
.addBearerAuth()
.build();


