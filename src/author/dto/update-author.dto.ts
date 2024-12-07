import { Author } from '../schema/author.schema';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

export class UpdateAuthorDto {
  readonly name: string;
  readonly description: string;
  readonly author: Author;
}
