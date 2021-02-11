/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionService;
let createUser: CreateUserService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new Session', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com.br',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'jhondoe@example.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a new Session with non-existing user', async () => {
    expect(
      createSession.execute({
        email: 'jhondoe@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Session with wrong password', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com.br',
      password: '123456',
    });

    await expect(
      createSession.execute({
        email: 'jhondoe@example.com.br',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
