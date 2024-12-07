import { Category } from '../schema/category.schema';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

export class UpdateCategoryDto {
  readonly name: string;
  readonly description: string;
  readonly category: Category;
}
