/* eslint-disable camelcase */
import { v4 as uuid } from 'uuid';

import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import ICreateCandidateDTO from '@modules/candidates/dtos/ICreateCandidateDTO';

import Candidate from '../../infra/typeorm/entities/Candidate';

class FakeCandidatesRepository implements ICandidatesRepository {
  private candidates: Candidate[] = [];

  public async create({
    name,
    email,
    age,
    linkedinUrl,
    technologies,
  }: ICreateCandidateDTO): Promise<Candidate> {
    const candidate = new Candidate();

    Object.assign(candidate, {
      id: uuid(),
      name,
      email,
      age,
      linkedinUrl,
      technologies,
    });

    this.candidates.push(candidate);

    return candidate;
  }

  public async save(candidate: Candidate): Promise<void> {
    this.candidates.push(candidate);
  }

  public async delete(candidate: Candidate): Promise<void> {
    const findIndex = this.candidates.findIndex(
      findCandidate => findCandidate.id === candidate.id,
    );

    this.candidates.splice(findIndex, 1);
  }

  public async findAll(): Promise<Candidate[]> {
    const allCandidates = this.candidates;
    return allCandidates;
  }

  public async findById(id: string): Promise<Candidate | undefined> {
    const candidate = this.candidates.find(
      findCandidate => findCandidate.id === id,
    );

    return candidate;
  }

  public async findByMail(email: string): Promise<Candidate | undefined> {
    const candidate = this.candidates.find(
      findCandidate => findCandidate.email === email,
    );

    return candidate;
  }

  public async findByTechnologies(technology: string[]): Promise<Candidate[]> {
    const candidateByTechnology: Candidate[] = [];

    this.candidates.map(candidate => {
      if (
        candidate.technologies.filter(candidateTechnology =>
          technology.includes(candidateTechnology),
        )
      ) {
        return candidateByTechnology.push(candidate);
      }
      return candidate;
    });

    return candidateByTechnology;
  }
}

export default FakeCandidatesRepository;
