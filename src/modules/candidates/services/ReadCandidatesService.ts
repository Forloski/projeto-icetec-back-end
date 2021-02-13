import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import Candidate from '../infra/typeorm/entities/Candidate';

@injectable()
class ReadCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute(id: string): Promise<Candidate> {
    const candidate = await this.candidatesRepository.findById(id);

    if (!candidate) {
      throw new AppError('Something whent wrong when reading candidate.');
    }

    return candidate;
  }
}

export default ReadCandidateService;
