import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);

  // Enable CORS for specific origins
  app.enableCors({
    origin: [
      'http://localhost:3000',  // For local development
      'https://testa-asta-kurdi-cda9ea8e953a.herokuapp.com',  // Your frontend URL on Heroku
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(PORT);
  console.log(`Server started on http://localhost:${PORT}`);
}
bootstrap();