import User from '../entities/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthenticateUser {
  public async execute(email: string, password: string) {
    let user = await User.findOne({ email }).exec();

    if (!bcryptjs.compareSync(password, user?.password ?? "")) {
      throw Error("Email and/or password invalid");
    }

    const token = jwt.sign({ user }, 'teste');

    return token;
  }
}

export default AuthenticateUser;
