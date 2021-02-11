import AppError from '@shared/errors/AppError';

import FakeCandidateRepository from '../repositories/fakes/FakeCandidatesRepository';
import CreateCandidateService from './CreateCandidatesService';

let fakeCandidateRepository: FakeCandidateRepository;
let createCandidate: CreateCandidateService;

describe('CreateCandidateService', () => {
  beforeEach(() => {
    fakeCandidateRepository = new FakeCandidateRepository();

    createCandidate = new CreateCandidateService(fakeCandidateRepository);
  });

  it('should be able to create a new candidate', async () => {
    const candidate = await createCandidate.execute({
      name: 'cadidate',
      email: 'candidate@example.com',
      age: 20,
      linkedinUrl: 'linkedin.com/candidate',
      technologies: ['javascript', 'angular'],
    });

    expect(candidate).toHaveProperty('id');
    expect(candidate.name).toBe('cadidate');
    expect(candidate.email).toBe('candidate@example.com');
    expect(candidate.age).toBe(20);
    expect(candidate.linkedinUrl).toBe('linkedin.com/candidate');
    expect(candidate.technologies).toStrictEqual(['javascript', 'angular']);
  });

  it('should not be able to create candidates with duplicated email', async () => {
    await createCandidate.execute({
      name: 'cadidate',
      email: 'candidate@example.com',
      age: 20,
      linkedinUrl: 'linkedin.com/candidate',
      technologies: ['javascript', 'angular'],
    });

    await expect(
      createCandidate.execute({
        name: 'duplicateCadidate',
        email: 'candidate@example.com',
        age: 20,
        linkedinUrl: 'linkedin.com/candidate',
        technologies: ['javascript', 'angular'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
