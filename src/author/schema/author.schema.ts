import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({
  timestamps: true, //tu dong them createAt va updateAt vao db
})
export class Author {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
