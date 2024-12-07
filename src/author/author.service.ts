import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schema/author.schema';
import mongoose from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: mongoose.Model<Author>,
  ) {}
  async findAllAuthors(): Promise<Author[]> {
    const authors = await this.authorModel.find();
    return authors;
  }
  async findAuthorById(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id);
    if (!author) {
      throw new NotFoundException('Khong tìm thấy Author');
    }
    return author;
  }
  async createAuthor(author: Author): Promise<Author> {
    const res = await this.authorModel.create(author);
    return res;
  }
  async updateAuthorById(id: string, author: Author): Promise<Author> {
    return await this.authorModel.findByIdAndUpdate(id, author, {
      new: true,
      runValidators: true,
    });
  }
  async deleteAuthorById(id: string): Promise<Author> {
    return await this.authorModel.findByIdAndDelete(id);
  }
}
