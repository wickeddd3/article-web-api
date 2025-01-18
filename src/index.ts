import 'dotenv/config';
import 'module-alias/register';
import { validateEnv } from '@/lib/validate-env';
import { App } from '@/app';
import { CompaniesController } from '@/modules/company/companies.controller';
import { UsersController } from '@/modules/user/users.controller';
import { ArticlesController } from '@/modules/article/articles.controller';
import { AuthController } from '@/modules/auth/auth.controller';

validateEnv();

const app = new App(
  [new CompaniesController(), new UsersController(), new ArticlesController(), new AuthController()],
  Number(process.env.PORT),
);

app.listen();
