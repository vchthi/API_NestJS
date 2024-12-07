import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(user: User): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Khong tìm thấy user');
    }
    return user;
  }

  async updateUserById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }
  async deleteUserById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
