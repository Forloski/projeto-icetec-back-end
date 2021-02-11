// import AppError from '@shared/errors/AppError';

import FakeCandidatesRepository from '../repositories/fakes/FakeCandidatesRepository';
import CreateCandidateService from './CreateCandidatesService';
import ListAllCandidatesService from './ListAllCandidatesService';

let fakeCandidateRepository: FakeCandidatesRepository;
let createCandidate: CreateCandidateService;
let listAllCandidatesService: ListAllCandidatesService;

describe('ListAllCandidatesService', () => {
  beforeEach(() => {
    fakeCandidateRepository = new FakeCandidatesRepository();
    createCandidate = new CreateCandidateService(fakeCandidateRepository);
    listAllCandidatesService = new ListAllCandidatesService(
      fakeCandidateRepository,
    );
  });

  it('should be able to list all candidates', async () => {
    const candidate1 = await createCandidate.execute({
      name: 'cadidate1',
      email: 'candidate1@example.com',
      age: 21,
      linkedinUrl: 'linkedin.com/candidate1',
      technologies: ['javascript1', 'angular1'],
    });

    const candidate2 = await createCandidate.execute({
      name: 'cadidate2',
      email: 'candidate2@example.com',
      age: 22,
      linkedinUrl: 'linkedin.com/candidate2',
      technologies: ['javascript2', 'angular2'],
    });

    const candidate3 = await createCandidate.execute({
      name: 'cadidate3',
      email: 'candidate3@example.com',
      age: 23,
      linkedinUrl: 'linkedin.com/candidate3',
      technologies: ['javascript3', 'angular3'],
    });

    const listOfAllCandidates = await listAllCandidatesService.execute();

    expect(listOfAllCandidates).toEqual([candidate1, candidate2, candidate3]);
  });
});
