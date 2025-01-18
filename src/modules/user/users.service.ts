import { hashPassword } from '@/lib/bcrypt';
import { generateToken } from '@/lib/jwt';
import { UsersRepository } from '@/modules/user/users.repository';
import { UserSchemaType } from '@/modules/user/user.schema';
import { AuthUser } from '@/types/user.type';
import { excludeFields } from '@/utils/data-transformers';
import { User } from '@prisma/client';

export class UsersService {
  private usersRepository = new UsersRepository();

  public async list(): Promise<User[] | Error> {
    try {
      const data = await this.usersRepository.list();
      return data as User[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<User | Error> {
    try {
      const user = await this.usersRepository.get(id);
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getByEmail(email: string): Promise<User | Error> {
    try {
      const user = await this.usersRepository.getByEmail(email);
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: UserSchemaType): Promise<AuthUser | Error> {
    try {
      const { firstname, lastname, type, status, email, password } = data;

      // Check if email already exist
      const isEmailExist = await this.usersRepository.getByEmail(email);
      if (isEmailExist) {
        throw new Error('Email already exist');
      }

      // If email doesn't exist hash password string and create user
      const hashedPassword = await hashPassword(password);
      const userData = {
        firstname,
        lastname,
        type,
        status,
        email,
        password: hashedPassword,
      };
      const user = await this.usersRepository.create(userData);

      // Throw error when user is not created
      if (!user) {
        throw new Error('Error occurred while creating user');
      }

      // Generate jwt token using user id and email
      const token = generateToken(user.id, user.email);

      const authUser = {
        user: excludeFields(user, ['password']),
        token,
      };

      return authUser as AuthUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: UserSchemaType): Promise<User | Error> {
    try {
      const user = await this.usersRepository.update(id, data);
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.usersRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
