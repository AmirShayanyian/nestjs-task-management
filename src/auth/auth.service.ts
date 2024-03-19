import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userDto: AuthCredentialDto): Promise<void> {
    const { username, password } = userDto;
    const user = this.userRepository.create({
      username: username,
      password: password,
    });
    await this.userRepository.save(user);
  }

  async signUp(userDto: AuthCredentialDto): Promise<void> {
    return this.createUser(userDto);
  }
}
