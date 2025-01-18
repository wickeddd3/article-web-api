import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CompaniesService } from '@/modules/company/companies.service';
import { authenticateJwt } from '@/middlewares/token.middleware';
import { companySchema } from '@/schemas/company.schema';

export class CompaniesController implements Controller {
  public path = '/companies';
  public router = Router();
  private companiesService = new CompaniesService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, [authenticateJwt], this.list);
    this.router.post(`${this.path}`, [authenticateJwt, validationMiddleware(companySchema)], this.create);
    this.router.get(`${this.path}/:id`, [authenticateJwt], this.get);
    this.router.put(`${this.path}/:id`, [authenticateJwt, validationMiddleware(companySchema)], this.update);
    this.router.delete(`${this.path}/:id`, [authenticateJwt], this.delete);
  }

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const companies = await this.companiesService.list();
      res.status(200).json(companies);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const company = await this.companiesService.create(data);
      res.status(201).json(company);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const company = await this.companiesService.get(parseInt(id));
      res.status(200).json(company);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const company = await this.companiesService.update(parseInt(id), data);
      res.status(200).json(company);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const company = await this.companiesService.delete(parseInt(id));
      res.status(200).json(company);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
