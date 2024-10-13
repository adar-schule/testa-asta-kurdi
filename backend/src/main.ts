import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://testa-asta-kurdi-cda9ea8e953a.herokuapp.com/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all standard methods
    credentials: true, // If you want to allow credentials like cookies or authentication tokens
  });

  await app.listen(PORT);
  console.log(`Server started on http://localhost:${PORT}`);
}
bootstrap();
