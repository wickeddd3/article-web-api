import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/interfaces/controller.interface';
import HttpException from '@/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import { loginSchema } from '@/modules/auth/login.schema';
import { AuthService } from '@/modules/auth/auth.service';
import { authenticateJwt } from '@/middlewares/token.middleware';

export class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private authService = new AuthService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/login`, validationMiddleware(loginSchema), this.login);
    this.router.get(`${this.path}/me`, authenticateJwt, this.authUser);
  }

  private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.authenticate({ email, password });
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private authUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json(req.user);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}
