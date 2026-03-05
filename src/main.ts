import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';

export let app: ReturnType<typeof NestFactory.create> | undefined;
export let openApiDocument: OpenAPIObject | undefined;

async function bootstrap(): Promise<void> {
  const nestApp = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('docs', nestApp, document);
  nestApp.getHttpAdapter().get('/openapi.json', (_req: unknown, res: any) => {
    res.json(document);
  });

  app = nestApp;
  openApiDocument = document;
  await nestApp.listen(3000);
}

bootstrap();
