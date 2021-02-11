// import AppError from '@shared/errors/AppError';

import FakeCandidatesRepository from '../repositories/fakes/FakeCandidatesRepository';
import CreateCandidateService from './CreateCandidatesService';
import ListCandidatesByTechnologyService from './ListCandidatesByTechnologyService';

let fakeCandidateRepository: FakeCandidatesRepository;
let createCandidate: CreateCandidateService;
let listCandidatesByTechnologyService: ListCandidatesByTechnologyService;

describe('ListCandidatesByTechnology', () => {
  beforeEach(() => {
    fakeCandidateRepository = new FakeCandidatesRepository();
    createCandidate = new CreateCandidateService(fakeCandidateRepository);
    listCandidatesByTechnologyService = new ListCandidatesByTechnologyService(
      fakeCandidateRepository,
    );
  });

  it('should be able to list all candidates based on selected technology', async () => {
    const candidate1 = await createCandidate.execute({
      name: 'cadidate1',
      email: 'candidate1@example.com',
      age: 21,
      linkedinUrl: 'linkedin.com/candidate1',
      technologies: ['technology1', 'technology2'],
    });

    const candidate2 = await createCandidate.execute({
      name: 'cadidate2',
      email: 'candidate2@example.com',
      age: 22,
      linkedinUrl: 'linkedin.com/candidate2',
      technologies: ['technology2', 'technology3'],
    });

    const candidate3 = await createCandidate.execute({
      name: 'cadidate3',
      email: 'candidate3@example.com',
      age: 23,
      linkedinUrl: 'linkedin.com/candidate3',
      technologies: ['technology3', 'technology1'],
    });

    const listOfCamdidatesByTechnology = await listCandidatesByTechnologyService.execute(
      ['technology3'],
    );

    expect(listOfCamdidatesByTechnology).toEqual([
      candidate1,
      candidate2,
      candidate3,
    ]);
  });
});
