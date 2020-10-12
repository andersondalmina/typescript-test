import bcryptjs from 'bcryptjs';
import User from '../entities/User';
import UserRepository from '../infra/database/UserRepository';

class CreateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute(name: string, email: string, password: string): User {
    password = bcryptjs.hashSync(password);

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    this.userRepository.save(user);

    return user;
  }
}

export default CreateUser;
