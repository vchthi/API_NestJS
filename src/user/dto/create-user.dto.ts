import { User } from '../schema/user.schema';

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly email?: string;
  readonly user: User;
}
