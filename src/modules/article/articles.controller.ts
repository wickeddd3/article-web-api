import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { ArticlesService } from '@/modules/article/articles.service';
import { authenticateJwt } from '@/middlewares/token.middleware';
import { articleSchema } from '@/modules/article/article.schema';

export class ArticlesController implements Controller {
  public path = '/articles';
  public router = Router();
  private articlesService = new ArticlesService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, [authenticateJwt], this.list);
    this.router.post(`${this.path}`, [authenticateJwt, validationMiddleware(articleSchema)], this.create);
    this.router.get(`${this.path}/:id`, [authenticateJwt], this.get);
    this.router.put(`${this.path}/:id`, [authenticateJwt, validationMiddleware(articleSchema)], this.update);
    this.router.delete(`${this.path}/:id`, [authenticateJwt], this.delete);
  }

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articles = await this.articlesService.list();
      res.status(200).json(articles);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const article = await this.articlesService.create(data);
      res.status(201).json(article);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const article = await this.articlesService.get(parseInt(id));
      res.status(200).json(article);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const article = await this.articlesService.update(parseInt(id), data);
      res.status(200).json(article);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const article = await this.articlesService.delete(parseInt(id));
      res.status(200).json(article);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
