// import AppError from '@shared/errors/AppError';

import FakeCandidateRepository from '../repositories/fakes/FakeCandidatesRepository';
import CreateCandidateService from './CreateCandidatesService';
import UpdateCandidatesService from './UpdateCandidatesService';

let fakeCandidateRepository: FakeCandidateRepository;
let createCandidate: CreateCandidateService;
let updateCandidates: UpdateCandidatesService;

describe('CreateCandidateService', () => {
  beforeEach(() => {
    fakeCandidateRepository = new FakeCandidateRepository();

    updateCandidates = new UpdateCandidatesService(fakeCandidateRepository);
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

    console.log(candidate);

    const updatedCandidate = await updateCandidates.execute({
      id: candidate.id,
      name: 'updatedCadidate',
      email: 'updatedCadidate@example.com',
      age: 33,
      linkedinUrl: 'linkedin.com/updatedCadidate',
      technologies: ['updatedJavascript', 'updatedAngular'],
    });

    console.log(candidate);

    expect(updatedCandidate.id).toStrictEqual(candidate.id);
    expect(updatedCandidate.name).toBe('updatedCadidate');
    expect(updatedCandidate.email).toBe('updatedCadidate@example.com');
    expect(updatedCandidate.age).toBe(33);
    expect(updatedCandidate.linkedinUrl).toBe('linkedin.com/updatedCadidate');
    expect(updatedCandidate.technologies).toStrictEqual([
      'updatedJavascript',
      'updatedAngular',
    ]);
  });
});
