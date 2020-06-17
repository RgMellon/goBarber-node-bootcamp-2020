import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'User Two',
      email: 'usertwo@mail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Logged User',
      email: 'loggedUser@mail.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
