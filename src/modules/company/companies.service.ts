import { CompaniesRepository } from '@/modules/company/companies.repository';
import { CompanySchemaType } from '@/schemas/company.schema';
import { Company } from '@prisma/client';

export class CompaniesService {
  private companiesRepository = new CompaniesRepository();

  public async list(): Promise<Company[] | Error> {
    try {
      const data = await this.companiesRepository.list();
      return data as Company[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Company | Error> {
    try {
      const company = await this.companiesRepository.get(id);
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: CompanySchemaType): Promise<Company | Error> {
    try {
      const company = await this.companiesRepository.create(data);
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: CompanySchemaType): Promise<Company | Error> {
    try {
      const company = await this.companiesRepository.update(id, data);
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.companiesRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
