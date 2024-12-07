import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}
  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }
  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Khong tìm thấy category');
    }
    return category;
    return category;
  }
  async createCategory(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    return res;
  }
  async updateCategoryById(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }
  async deleteCategoryById(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
