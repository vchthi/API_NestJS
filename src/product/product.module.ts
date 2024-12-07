import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/Product.schema';
import { CategoryModule } from '../category/category.module';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CategoryModule,
    AuthorModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
