import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserServise from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserServise = new CreateUserServise(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserServise.execute({
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to login with incorret password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUserServise = new CreateUserServise(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserServise.execute({
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
