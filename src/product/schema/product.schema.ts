import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt vào DB
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  old_price: number;

  @Prop({ required: true })
  new_price: number;

  @Prop({
    type: {
      categoryId: {
        type: MongooseSchema.Types.ObjectId,
        required: true,
        ref: 'Category',
      }, // Dùng ObjectId cho categoryId và liên kết với Collection 'Category'
      categoryName: { type: String, required: true },
    },
    required: true,
  })
  category: {
    categoryId: ObjectId;
    categoryName: string;
  };

  @Prop({
    type: {
      authorId: {
        type: MongooseSchema.Types.ObjectId,
        required: true,
        ref: 'Author',
      }, // Dùng ObjectId cho authorId và liên kết với Collection 'Author'
      authorName: { type: String, required: true },
    },
    required: true,
  })
  author: {
    authorId: ObjectId;
    authorName: string;
  };

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
