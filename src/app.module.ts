import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler'
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL,{useNewUrlParser:true}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
