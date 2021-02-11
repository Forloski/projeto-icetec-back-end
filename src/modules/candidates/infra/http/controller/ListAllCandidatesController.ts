import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllCandidates from '@modules/candidates/services/ListAllCandidatesService';

export default class ListAllCandidatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCandidates = container.resolve(ListAllCandidates);

    const providers = await listCandidates.execute();

    return response.json(providers);
  }
}
