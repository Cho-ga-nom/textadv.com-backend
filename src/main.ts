import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      'http://ec2-3-38-165-63.ap-northeast-2.compute.amazonaws.com:5000',
      'http://localhost:3000',
      'http://localhost:5000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
    exposedHeaders: ['Authorization'], // 브라우저에서 접근할 수 있도록 허용할 헤더
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );
  
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
