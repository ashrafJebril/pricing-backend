/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('lesting');
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3007); // Use a different port like 3001
}
bootstrap();
