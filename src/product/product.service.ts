import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/Product.schema';
import { Category, CategoryDocument } from '../category/schema/category.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Author, AuthorDocument } from '../author/schema/author.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}
  async findAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
  async findProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Khong tìm thấy product');
    }
    return product;
  }
  async createProduct(productDto: CreateProductDto): Promise<Product> {
    // Kiểm tra category
    const category = await this.categoryModel.findById(
      productDto.category.categoryId,
    );
    if (!category) {
      throw new BadRequestException('Category không tồn tại');
    }

    // Kiểm tra author
    const author = await this.authorModel.findById(productDto.author.authorId);
    if (!author) {
      throw new BadRequestException('Author không tồn tại');
    }

    // Tạo sản phẩm
    const newProduct = new this.productModel({
      ...productDto,
      category: {
        categoryId: category._id,
        categoryName: category.name,
      },
      author: {
        authorId: author._id,
        authorName: author.name,
      },
    });

    return newProduct.save();
  }
  async updateProductById(
    id: string,
    product: UpdateProductDto,
  ): Promise<Product> {
    const updateData: any = {
      ...product,
    };

    // Kiểm tra danh mục trước khi cập nhật
    if (product.category) {
      const category = await this.categoryModel.findOne({
        _id: product.category.categoryId,
      });
      if (!category) {
        throw new Error('Danh mục không tồn tại');
      }
      updateData.category = {
        categoryId: category._id,
        categoryName: category.name,
      };
    }

    // Kiểm tra tác giả trước khi cập nhật
    if (product.author) {
      const author = await this.authorModel.findOne({
        _id: product.author.authorId,
      });
      if (!author) {
        throw new Error('Tác giả không tồn tại');
      }
      updateData.author = {
        authorId: author._id,
        authorName: author.name,
      };
    }
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    return updatedProduct;
  }

  async deleteProductById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
  async searchProductByName(name: string): Promise<Product[]> {
    const regex = new RegExp(name, 'i'); // i không phân biệt hoa thường
    return this.productModel.find({ name: { $regex: regex } }).exec();
  }
}
