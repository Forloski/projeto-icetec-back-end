// import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import Candidate from '../infra/typeorm/entities/Candidate';
import ICreateCandidateDTO from '../dtos/ICreateCandidateDTO';

export default interface ICandidatesRepository {
  create(data: ICreateCandidateDTO): Promise<Candidate>;
  save(candidate: Candidate): Promise<void>;
  delete(candidate: Candidate): Promise<void>;
  findAll(): Promise<Candidate[]>;
  findById(id: string): Promise<Candidate | undefined>;
  findByMail(email: string): Promise<Candidate | undefined>;
  findByTechnologies(technology: string[]): Promise<Candidate[]>;
}
