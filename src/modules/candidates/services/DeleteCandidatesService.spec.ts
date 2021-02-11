import AppError from '@shared/errors/AppError';

import FakeCandidatesRepository from '../repositories/fakes/FakeCandidatesRepository';
import DeleteCandidatesService from './DeleteCandidatesService';
import CreateCandidateService from './CreateCandidatesService';

let fakeCandidateRepository: FakeCandidatesRepository;
let deleteCandidate: DeleteCandidatesService;
let createCandidate: CreateCandidateService;

describe('DeleteCandidateService', () => {
  beforeEach(() => {
    fakeCandidateRepository = new FakeCandidatesRepository();
    createCandidate = new CreateCandidateService(fakeCandidateRepository);
    deleteCandidate = new DeleteCandidatesService(fakeCandidateRepository);
  });

  it('should be able to delete a candidate', async () => {
    const candidate = await createCandidate.execute({
      name: 'cadidate',
      email: 'candidate@example.com',
      age: 20,
      linkedinUrl: 'linkedin.com/candidate',
      technologies: ['javascript', 'angular'],
    });

    await deleteCandidate.execute(candidate.id);

    const newCandidate = await createCandidate.execute({
      name: 'cadidate',
      email: 'candidate@example.com',
      age: 20,
      linkedinUrl: 'linkedin.com/candidate',
      technologies: ['javascript', 'angular'],
    });

    expect(newCandidate.email).toStrictEqual('candidate@example.com');
  });

  it('should not be able to delete a candidate that doesnt exists', async () => {
    await expect(
      deleteCandidate.execute('inexistentID'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
