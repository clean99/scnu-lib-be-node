import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [MongooseModule
    .forRoot('mongodb://user:pass@mongodb:27017/',{useNewUrlParser:true}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
