import { ArticlesRepository } from '@/modules/article/articles.repository';
import { ArticleSchemaType } from '@/modules/article/article.schema';
import { Article } from '@prisma/client';

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
      const article = await this.articlesRepository.create(data);
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: ArticleSchemaType): Promise<Article | Error> {
    try {
      const article = await this.articlesRepository.update(id, data);
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
