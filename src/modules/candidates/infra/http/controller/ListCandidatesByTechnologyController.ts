import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCandidatesByTechnology from '@modules/candidates/services/ListCandidatesByTechnologyService';

export default class ListCandidatesByTechnologyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { technologies } = request.body;

    const listCandidatesByTechnology = container.resolve(
      ListCandidatesByTechnology,
    );

    const providers = await listCandidatesByTechnology.execute(technologies);

    return response.json(providers);
  }
}
