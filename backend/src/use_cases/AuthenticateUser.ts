import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import UserRepository from '../infra/database/UserRepository';

class AuthenticateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string, password: string): Promise<String> {
    let user = await this.userRepository.getByEmail(email);
    if (user == undefined) {
      throw Error('Email e/ou senha invalidos');
    }

    if (!bcryptjs.compareSync(password, user?.password ?? '')) {
      throw Error('mail e/ou senha invalidos');
    }

    return this.generateToken(user);
  }

  public generateToken(user: User): string {
    return jwt.sign({ user }, process.env.JWT_SECRET ?? '', {
      expiresIn: 86400,
    });
  }
}

export default AuthenticateUser;
