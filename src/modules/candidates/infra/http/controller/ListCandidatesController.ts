import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllCandidates from '@modules/candidates/services/ListAllCandidatesService';
import ListCandidatesByTechnology from '@modules/candidates/services/ListCandidatesByTechnologyService';

export default class ListAllCandidatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    let technologies: string[];

    if (typeof request.query.tech === 'string') {
      technologies = [];
      technologies.push(request.query.tech);
    } else {
      technologies = request.query.tech as string[];
    }

    if (!technologies) {
      const listCandidates = container.resolve(ListAllCandidates);

      const providers = await listCandidates.execute();

      return response.json(providers);
    }

    const listCandidatesByTechnology = container.resolve(
      ListCandidatesByTechnology,
    );

    const candidates = await listCandidatesByTechnology.execute(technologies);

    return response.json(candidates);
  }
}
