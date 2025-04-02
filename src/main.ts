import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Auto-converts query params
      // whitelist: true, // Ignores unknown properties
      // forbidNonWhitelisted: false, // Doesn't reject unknown properties
      skipMissingProperties: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Trek Gems API')
    .setDescription('the Trek Gems API description')
    .setVersion('1.0')
    .addTag('trek-gems')
    .addBearerAuth()

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({
    origin: '*', // Allows requests from any frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
