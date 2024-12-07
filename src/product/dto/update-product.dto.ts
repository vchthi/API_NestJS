import { ObjectId } from 'mongoose';
import { Product } from '../schema/Product.schema';

export class UpdateProductDto {
  readonly name: string;
  readonly old_price: number;
  readonly new_price: number;
  readonly image: string;
  readonly author: {
    authorId: ObjectId | string;
    authorName: string;
  };

  readonly category: {
    categoryId: ObjectId | string;
    categoryName: string;
  };
  readonly description: string;
}
