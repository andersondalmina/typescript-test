import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../infra/database/UserRepository';

class AuthenticateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string, password: string): Promise<String> {
    let user = await this.userRepository.getByEmail(email);

    if (!bcryptjs.compareSync(password, user?.password ?? '')) {
      throw Error('Email and/or password invalid');
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET ?? "", {
      expiresIn: 86400,
    });

    return token;
  }
}

export default AuthenticateUser;
