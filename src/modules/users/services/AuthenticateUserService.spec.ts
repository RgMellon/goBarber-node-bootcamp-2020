import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able create a new user', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@mail.com',
      password: '123456',
    });

    const user = await authenticateUser.execute({
      email: 'jhondoe@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
    expect(user).toEqual(user);
  });

  it('should not be able to authenticate with non user existing', async () => {
    expect(
      authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to login with incorret password', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@mail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '1234561283',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
