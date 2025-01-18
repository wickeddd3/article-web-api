import { prisma } from '@/lib/prisma';
import { UserSchemaType } from '@/modules/user/user.schema';
import { User } from '@prisma/client';

export class UsersRepository {
  private db = prisma;

  public async list(): Promise<User[] | Error> {
    try {
      const users = await this.db.user.findMany();
      return users as User[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<User | Error> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: UserSchemaType): Promise<User> {
    try {
      const user = await this.db.user.create({
        data: {
          ...data,
        },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: UserSchemaType): Promise<User> {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: {
          ...data,
        },
      });
      return user as User;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.db.user.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
