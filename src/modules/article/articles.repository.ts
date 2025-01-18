import { prisma } from '@/lib/prisma';
import { ArticleSchemaType } from '@/modules/article/article.schema';
import { Article } from '@prisma/client';

export class ArticlesRepository {
  private db = prisma;

  public async list(): Promise<Article[] | Error> {
    try {
      const articles = await this.db.article.findMany();
      return articles as Article[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Article | Error> {
    try {
      const article = await this.db.article.findUnique({
        where: { id },
      });
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(data: ArticleSchemaType): Promise<Article | Error> {
    try {
      const article = await this.db.article.create({
        data: {
          ...data,
        },
      });
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(id: number, data: ArticleSchemaType): Promise<Article | Error> {
    try {
      const article = await this.db.article.update({
        where: { id },
        data: {
          ...data,
        },
      });
      return article as Article;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<void | Error> {
    try {
      await this.db.article.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
