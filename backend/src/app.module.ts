import { Module, Res } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './question/question.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultModule } from './result/result.module';
import { AuthModule } from './auth/auth.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables from the .env file
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Load MongoDB URI from the env variable
      }),
    }),
    QuestionModule,
    ResultModule,
    AuthModule,
    ManagementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }