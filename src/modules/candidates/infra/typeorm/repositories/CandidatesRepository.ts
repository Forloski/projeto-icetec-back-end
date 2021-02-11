import { getRepository, Repository } from 'typeorm';

import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import Candidate from '../entities/Candidate';

class CandidatesRepository implements ICandidatesRepository {
  private ormRepository: Repository<Candidate>;

  constructor() {
    this.ormRepository = getRepository(Candidate);
  }

  public async create(candidateData: ICreateCandidateDTO): Promise<Candidate> {
    const candidate = this.ormRepository.create(candidateData);

    await this.ormRepository.save(candidate);

    return candidate;
  }

  public async delete(candidate: Candidate): Promise<void> {
    this.ormRepository.remove(candidate);
  }

  public async save(candidate: Candidate): Promise<void> {
    await this.ormRepository.save(candidate);
  }

  public async findAll(): Promise<Candidate[]> {
    const findAllCandidates = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return findAllCandidates;
  }

  public async findByMail(email: string): Promise<Candidate | undefined> {
    const candidate = await this.ormRepository.findOne({
      where: { email },
    });
    return candidate;
  }

  public async findById(id: string): Promise<Candidate | undefined> {
    const candidate = await this.ormRepository.findOne({
      where: { id },
    });
    return candidate;
  }

  public async findByTechnologies(
    candidateTechnologies: string[],
  ): Promise<Candidate[]> {
    const candidate = await this.ormRepository
      .createQueryBuilder('candidate')
      .where('candidate.technologies @> :technologies', {
        technologies: candidateTechnologies,
      })
      .getMany();

    return candidate;
  }
}

export default CandidatesRepository;
