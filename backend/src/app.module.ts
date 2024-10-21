import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';  // Comment out Mongoose
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/testa-asta-kurdi'),  // Comment out MongoDB connection
    QuestionModule,  // Keep QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }