/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import Candidate from '../infra/typeorm/entities/Candidate';
import ICandidatesRepository from '../repositories/ICandidatesRepository';

@injectable()
class ListCandidatesByTechnologyService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute(candidateTechnologies: string[]): Promise<Candidate[]> {
    const candidates = await this.candidatesRepository.findByTechnologies(
      candidateTechnologies,
    );

    return candidates;
  }
}

export default ListCandidatesByTechnologyService;
