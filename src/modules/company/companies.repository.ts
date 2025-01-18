import { prisma } from '@/lib/prisma';
import { CompanySchemaType } from '@/modules/company/company.schema';
import { Company } from '@prisma/client';

export class CompaniesRepository {
  private db = prisma;

  public async list(): Promise<Company[] | Error> {
    try {
      const companies = await this.db.company.findMany();
      return companies as Company[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Company | Error> {
    try {
      const company = await this.db.company.findUnique({
        where: { id },
      });
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: CompanySchemaType): Promise<Company | Error> {
    try {
      const company = await this.db.company.create({
        data: {
          ...data,
        },
      });
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: CompanySchemaType): Promise<Company | Error> {
    try {
      const company = await this.db.company.update({
        where: { id },
        data: {
          ...data,
        },
      });
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.db.company.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
