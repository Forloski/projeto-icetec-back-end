import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import Candidate from '../infra/typeorm/entities/Candidate';

interface IRequest extends ICreateCandidateDTO {
  id: string;
}

@injectable()
class CreateCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    age,
    linkedinUrl,
    technologies,
  }: IRequest): Promise<Candidate> {
    const candidate = await this.candidatesRepository.findById(id);

    if (!candidate) {
      throw new AppError('Something whent wrong when updating candidate.');
    }

    candidate.name = name;
    candidate.email = email;
    candidate.age = age;
    candidate.linkedinUrl = linkedinUrl;
    candidate.technologies = technologies;

    await this.candidatesRepository.save(candidate);

    return candidate;
  }
}

export default CreateCandidateService;
