import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schema/Product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }
  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProductById(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProductById(id);
  }

  @Get('search/:name')
  async searchProduct(
    @Param('name') name: string, // Sửa để lấy name từ query
  ): Promise<Product[]> {
    return this.productService.searchProductByName(name); // Truyền name vào thay vì product.name
  }
}
