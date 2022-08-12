import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import settings from '@/settings'
import * as yaml from 'js-yaml'
const fs = require('fs')

function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Timetable List API')
    .setDescription('EU module for scheduling')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  console.log(document)
  SwaggerModule.setup('api', app, document);
  fs.writeFile('./document.yml', yaml.dump(document), (err) => {
    if (err) {
        console.log(err);
    }
});
  SwaggerModule.setup('api/v1', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app)
  app.setGlobalPrefix(settings.normalizedBasePath);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
