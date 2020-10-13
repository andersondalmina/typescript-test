import bcryptjs from 'bcryptjs';
import User from '../entities/User';
import UserRepository from '../infra/database/UserRepository';

class CreateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: email },
    });
    if (userExists != null) {
      throw new Error('Já existe um usuário cadastrado com esse email');
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = bcryptjs.hashSync(password);

    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUser;
