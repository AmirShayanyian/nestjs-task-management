import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(userDto: AuthCredentialDto): Promise<void> {
    const { username, password, email, phoneNumber } = userDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //  console.log('salt: ', salt);
    // console.log('hashedPassword: ', hashedPassword);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
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

  async signIn(signInDto: UserSignInDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Success';
    } else {
      throw new UnauthorizedException('Please check the login credentials.');
    }
  }
}
