import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(userDto: AuthCredentialDto): Promise<void> {
    const { username, password } = userDto;
    const user = this.userRepository.create({
      username,
      password,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Duplicate username!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signUp(userDto: AuthCredentialDto): Promise<void> {
    return this.createUser(userDto);
  }
}
