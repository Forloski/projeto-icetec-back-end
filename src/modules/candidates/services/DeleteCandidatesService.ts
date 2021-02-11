import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';

@injectable()
class DeleteCandidateService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const candidate = await this.candidatesRepository.findById(id);

    if (!candidate) {
      throw new AppError('Cannot find candidate.');
    }

    await this.candidatesRepository.delete(candidate);
  }
}

export default DeleteCandidateService;
