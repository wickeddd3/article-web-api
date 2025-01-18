import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { UsersService } from '@/modules/user/users.service';
import { authenticateJwt } from '@/middlewares/token.middleware';
import { userSchema } from '@/modules/user/user.schema';

export class UsersController implements Controller {
  public path = '/users';
  public router = Router();
  private usersService = new UsersService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, [authenticateJwt], this.list);
    this.router.post(`${this.path}`, [authenticateJwt, validationMiddleware(userSchema)], this.create);
    this.router.get(`${this.path}/:id`, [authenticateJwt], this.get);
    this.router.put(`${this.path}/:id`, [authenticateJwt, validationMiddleware(userSchema)], this.update);
    this.router.delete(`${this.path}/:id`, [authenticateJwt], this.delete);
  }

  private list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.usersService.list();
      res.status(200).json(users);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const user = await this.usersService.create(data);
      res.status(201).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.usersService.get(parseInt(id));
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await this.usersService.update(parseInt(id), data);
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.usersService.delete(parseInt(id));
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
