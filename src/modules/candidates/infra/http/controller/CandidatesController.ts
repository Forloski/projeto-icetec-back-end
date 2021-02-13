import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import CreateCandidate from '@modules/candidates/services/CreateCandidatesService';
import DeleteCandidate from '@modules/candidates/services/DeleteCandidatesService';
import UpdateCandidate from '@modules/candidates/services/UpdateCandidatesService';
import ReadCandidate from '@modules/candidates/services/ReadCandidatesService';

interface IUpdateCandidateData extends ICreateCandidateDTO {
  id: string;
}

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
    const { id } = request.params;

    const deleteCandidate = container.resolve(DeleteCandidate);

    await deleteCandidate.execute(id);

    return response.sendStatus(200);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      email,
      age,
      linkedinUrl,
      technologies,
    } = (request.query as unknown) as IUpdateCandidateData;

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

  public async index(request: Request, response: Response): Promise<Response> {
    const id = (request.params.id as unknown) as string;

    const readCandidate = container.resolve(ReadCandidate);

    const candidate = await readCandidate.execute(id);

    return response.json(candidate);
  }
}
