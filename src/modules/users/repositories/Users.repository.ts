import { EntityRepository, Repository } from 'typeorm';
import CreateUserDTO from '../dtos/CreateUser.dto';
import Users from '../entities/Users.entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  public async findByCPF(cpf: number): Promise<Users> {
    return await this.findOne({ where: { cpf } });
  }

  public async createNewUser(user: CreateUserDTO): Promise<Users> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }

  public async findByUsername(username: string): Promise<Users> {
    return await this.findOne({ where: { username: username } });
  }
}
