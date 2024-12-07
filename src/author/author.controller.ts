import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './schema/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private authorController: AuthorService) {}

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return this.authorController.findAllAuthors();
  }
  @Get(':id')
  async getAuthorById(@Param('id') id: string): Promise<Author> {
    return this.authorController.findAuthorById(id);
  }
  @Post()
  async createAuthor(@Body() author: CreateAuthorDto): Promise<Author> {
    return this.authorController.createAuthor(author);
  }
  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() author: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorController.updateAuthorById(id, author);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<Author> {
    return this.authorController.deleteAuthorById(id);
  }
}
