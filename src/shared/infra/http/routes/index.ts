// src/routes/index.ts
import 'reflect-metadata';
import { Router } from 'express';
// import providersRouter from '@modules/candidates/infra/http/routes/providers.routes';
import candidatesRouter from '@modules/candidates/infra/http/routes/candidates.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/candidates', candidatesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
// routes.use('/providers', providersRouter);

export default routes;
