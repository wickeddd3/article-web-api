import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import Controller from '@/interfaces/controller.interface';
import ErrorMiddleware from '@/middlewares/error.middleware';
import { initializePassport } from '@/middlewares/token.middleware';
import { allowedOrigins } from '@/config/cors-origins';

export class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.configureCors();
    this.express.use(morgan('dev'));
    this.express.use(express.json({ limit: '10mb' }));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(initializePassport());
  }

  private configureCors(): void {
    const corsOptions = {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow access
        } else {
          callback(new Error('Not allowed by CORS')); // Deny access
        }
      },
      credentials: true, // Include credentials (cookies, authorization headers, etc.)
    };

    this.express.use(cors(corsOptions));
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
