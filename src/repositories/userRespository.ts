import { Service } from 'typedi';
import { EntityRepository, Repository, EntityManager } from 'typeorm';
import { User } from '../entities/user';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User>{

}