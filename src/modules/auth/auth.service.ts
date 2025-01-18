import { isPasswordValid } from '@/lib/bcrypt';
import { generateToken } from '@/lib/jwt';
import { UsersRepository } from '@/modules/user/users.repository';
import { LoginSchemaType } from '@/modules/auth/login.schema';
import { AuthUser } from '@/types/user.type';
import { excludeFields } from '@/utils/data-transformers';

export class AuthService {
  private usersRepository = new UsersRepository();

  public async authenticate(data: LoginSchemaType): Promise<AuthUser | Error> {
    try {
      const { email, password } = data;

      // Check if user exist
      const user = await this.usersRepository.getByEmail(email);
      // Throw error if user doesn't exist or if password doesn't match to existing user password
      if (!user || !(await isPasswordValid(password, user.password))) {
        throw new Error('Invalid email or password');
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
}
