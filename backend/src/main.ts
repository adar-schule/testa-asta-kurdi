import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get('PORT') || 5001;

  app.setGlobalPrefix('api');  // This ensures that all routes are prefixed with '/api'
  app.enableCors();  // Enable CORS

  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();