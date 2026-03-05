import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

export let app: unknown;

async function bootstrap(): Promise<void> {
  const nestApp = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('docs', nestApp, document);

  app = nestApp;
  await nestApp.listen(3000);
}

bootstrap();
