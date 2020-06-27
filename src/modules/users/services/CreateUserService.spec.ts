import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServise from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserServise;
let fakeCache: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCache = new FakeCacheProvider();

    createUserService = new CreateUserServise(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCache,
    );
  });

  it('should be able create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Jhon doe',
      email: 'jhondoe@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create a new user with the same email', async () => {
    await createUserService.execute({
      name: 'Jhon doe',
      email: 'jhondoe@mail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Jhon doe',
        email: 'jhondoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
