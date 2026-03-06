import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';

export let openApiDocument: OpenAPIObject | null = null;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  openApiDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, openApiDocument);
  const port = process.env.PORT ? Number(process.env.PORT) : 0;
  await app.listen(port);
}

bootstrap();
