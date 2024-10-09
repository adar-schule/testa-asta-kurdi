import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 5001;
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Enable CORS for all origins
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
