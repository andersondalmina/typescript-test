import User from '../entities/User';
import bcryptjs from 'bcryptjs';

class CreateUser {
  public execute(name: string, email: string, password: string) {
    password = bcryptjs.hashSync(password);

    let user = new User({
      name,
      email,
      password,
    });

    user.save();
    console.log(user)
  }
}

export default CreateUser;
