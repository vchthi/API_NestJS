import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }
  @Post()
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryById(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategoryById(id);
  }
}
