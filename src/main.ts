import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Logger
  app.useLogger(app.get(Logger));

  // Cookie Parser
  app.use(cookieParser());

  // Enable CORS
  app.enableCors({
    origin: '*', // Allow specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
  });

  // Set Global Prefix for Routes
  app.setGlobalPrefix('/api');

  // Get Port from Config Service
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
