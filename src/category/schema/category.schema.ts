import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true, //tu dong them createAt va updateAt vao db
})
export class Category {
  @Prop({ required: true })
  name: string;

  // @Prop({ required: true })
  // image: string;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
