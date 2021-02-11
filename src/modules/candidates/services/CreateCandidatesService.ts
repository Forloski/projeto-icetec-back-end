import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import Candidate from '../infra/typeorm/entities/Candidate';

@injectable()
class CreateCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute({
    name,
    email,
    age,
    linkedinUrl,
    technologies,
  }: ICreateCandidateDTO): Promise<Candidate> {
    const checkCandidateExists = await this.candidatesRepository.findByMail(
      email,
    );

    if (checkCandidateExists) {
      throw new AppError('Email already used.');
    }

    const candidate = await this.candidatesRepository.create({
      name,
      email,
      age,
      linkedinUrl,
      technologies,
    });

    return candidate;
  }
}

export default CreateCandidateService;
