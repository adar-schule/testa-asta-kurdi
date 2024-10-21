import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Testa Asta Kurdi API')
    .setDescription('Kurdish Language Test API documentation')
    .setVersion('1.0')
    .addTag('questions')  // You can add more tags as you create additional controllers
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Swagger API documentation available at http://localhost:${PORT}/api`);
}
bootstrap();