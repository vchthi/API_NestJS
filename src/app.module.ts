import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthorModule } from './author/author.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/api_nestjs',
    ),
    CategoryModule,
    ProductModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
