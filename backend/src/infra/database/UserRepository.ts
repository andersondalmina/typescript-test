import { EntityRepository, Repository } from 'typeorm';
import User from '../../entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async getByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ email });
  }
}
