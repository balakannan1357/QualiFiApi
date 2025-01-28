import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const Routes = [];

Routes.push(new IndexRoute());
Routes.push(new AuthRoute());
Routes.push(new UserRoute());

const app = new App(Routes);

app.listen();
