import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/config/cloudinary-keys';
import { ArticlesRepository } from '@/modules/article/articles.repository';
import { ArticleSchemaType, EditArticleSchemaType } from '@/modules/article/article.schema';
import { Article } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class ArticlesService {
  private articlesRepository = new ArticlesRepository();

  public async list(): Promise<Article[] | Error> {
    try {
      const data = await this.articlesRepository.list();
      return data as Article[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Article | Error> {
    try {
      const article = await this.articlesRepository.get(id);
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: ArticleSchemaType): Promise<Article | Error> {
    try {
      let imageUrl: string | undefined;
      if (data.image) {
        const uploadResponse = await cloudinary.uploader.upload(data.image);
        if (!uploadResponse.secure_url) {
          throw new Error('Error occurred while uploading article image');
        }
        imageUrl = uploadResponse.secure_url;
      }
      const dataRequest = {
        ...data,
        image: imageUrl || '',
      };

      const article = await this.articlesRepository.create(dataRequest);
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: EditArticleSchemaType): Promise<Article | Error> {
    try {
      let imageUrl: string | undefined;
      if (data.newImage) {
        const uploadResponse = await cloudinary.uploader.upload(data.newImage);
        if (!uploadResponse.secure_url) {
          throw new Error('Error occurred while uploading article image');
        }
        imageUrl = uploadResponse.secure_url;
      }
      const dataRequest = {
        title: data.title,
        link: data.link,
        date: data.date,
        content: data.content,
        status: data.status,
        editorId: data.editorId,
        companyId: data.companyId,
        ...(data.newImage ? { image: imageUrl } : {}),
      };

      const article = await this.articlesRepository.update(id, dataRequest);
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.articlesRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
