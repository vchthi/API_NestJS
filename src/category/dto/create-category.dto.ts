import { Category } from '../schema/category.schema';

export class CreateCategoryDto {
  readonly name: string;
  readonly description: string;
  readonly category: Category;
}
