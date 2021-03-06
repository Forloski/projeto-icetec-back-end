import 'reflect-metadata';
import { Router } from 'express';

import candidatesRouter from '@modules/candidates/infra/http/routes/candidates.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/candidates', candidatesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
