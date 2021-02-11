/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CandidatesController from '../controller/CandidatesController';
import ListAllCandidatesController from '../controller/ListAllCandidatesController';
import ListCandidatesByTechnologyController from '../controller/ListCandidatesByTechnologyController';

const candidatesRouter = Router();

const candidatesController = new CandidatesController();
const listAllCandidatesController = new ListAllCandidatesController();
const listCandidatesByTechnologyController = new ListCandidatesByTechnologyController();

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

candidatesRouter.get('/all', listAllCandidatesController.index);

candidatesRouter.post(
  '/byTechnologies',
  celebrate({
    [Segments.BODY]: {
      technologies: Joi.array().items(Joi.string()).single(),
    },
  }),
  listCandidatesByTechnologyController.index,
);

candidatesRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  candidatesController.delete,
);

export default candidatesRouter;
