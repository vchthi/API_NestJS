import {
  Param,
  Body,
  Put,
  Controller,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }
  @Get(':id')
  async getUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.getUserById(id);
  }
  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, user);
  }
  @Delete(':id')
  async deleteUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
