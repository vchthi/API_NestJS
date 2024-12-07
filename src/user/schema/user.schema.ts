import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true, //tu dong them createAt va updateAt vao db
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
