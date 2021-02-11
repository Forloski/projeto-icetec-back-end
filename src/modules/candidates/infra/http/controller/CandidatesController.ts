import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCandidate from '@modules/candidates/services/CreateCandidatesService';
import DeleteCandidate from '@modules/candidates/services/DeleteCandidatesService';
import UpdateCandidate from '@modules/candidates/services/UpdateCandidatesService';

export default class CandidatesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, age, linkedinUrl, technologies } = request.body;

    const createCandidate = container.resolve(CreateCandidate);

    const candidate = await createCandidate.execute({
      name,
      email,
      age,
      linkedinUrl,
      technologies,
    });

    return response.json(candidate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteCandidate = container.resolve(DeleteCandidate);

    await deleteCandidate.execute(id);

    return response.json(true);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, email, age, linkedinUrl, technologies } = request.body;

    const updateCandidate = container.resolve(UpdateCandidate);

    const candidate = await updateCandidate.execute({
      id,
      name,
      email,
      age,
      linkedinUrl,
      technologies,
    });

    return response.json(candidate);
  }
}
