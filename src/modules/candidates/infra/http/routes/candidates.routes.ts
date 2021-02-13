/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CandidatesController from '../controller/CandidatesController';
import ListCandidatesController from '../controller/ListCandidatesController';

const candidatesRouter = Router();

const candidatesController = new CandidatesController();
const listCandidatesController = new ListCandidatesController();

candidatesRouter.use(ensureAuthenticated);

candidatesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      age: Joi.number(),
      linkedinUrl: Joi.string(),
      technologies: Joi.array().items(Joi.string()).single(),
    },
  }),
  candidatesController.create,
);

candidatesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      age: Joi.number(),
      linkedinUrl: Joi.string(),
      technologies: Joi.array().items(Joi.string()).single(),
    },
  }),
  candidatesController.update,
);

candidatesRouter.get('/', listCandidatesController.index);

candidatesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  candidatesController.delete,
);

export default candidatesRouter;
