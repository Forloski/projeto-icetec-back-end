/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import Candidate from '../infra/typeorm/entities/Candidate';
import ICandidatesRepository from '../repositories/ICandidatesRepository';

@injectable()
class ListAllCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute(): Promise<Candidate[]> {
    const candidates = await this.candidatesRepository.findAll();

    return candidates;
  }
}

export default ListAllCandidatesService;
