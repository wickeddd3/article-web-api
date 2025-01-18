import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/config/cloudinary-keys';
import { CompaniesRepository } from '@/modules/company/companies.repository';
import { CompanySchemaType, EditCompanySchemaType } from '@/modules/company/company.schema';
import { Company } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

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
      let logoUrl: string | undefined;
      if (data.logo) {
        const uploadResponse = await cloudinary.uploader.upload(data.logo);
        if (!uploadResponse.secure_url) {
          throw new Error('Error occurred while uploading company logo');
        }
        logoUrl = uploadResponse.secure_url;
      }
      const dataRequest = {
        ...data,
        logo: logoUrl || '',
      };

      const company = await this.companiesRepository.create(dataRequest);
      return company as Company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: EditCompanySchemaType): Promise<Company | Error> {
    try {
      let logoUrl: string | undefined;
      if (data.newLogo) {
        const uploadResponse = await cloudinary.uploader.upload(data.newLogo);
        if (!uploadResponse.secure_url) {
          throw new Error('Error occurred while uploading company logo');
        }
        logoUrl = uploadResponse.secure_url;
      }
      const dataRequest = {
        name: data.name,
        status: data.status,
        ...(data.newLogo ? { logo: logoUrl } : {}),
      };

      const company = await this.companiesRepository.update(id, dataRequest);
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
