import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserAcatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const userProfile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe('Jhon doe');
    expect(userProfile.email).toBe('johndoe@mail.com');
  });

  it('should be able show the profile non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
