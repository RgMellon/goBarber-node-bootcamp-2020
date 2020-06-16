import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateUserAcatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able update a user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'maicao',
      email: 'maicao@mail.com',
      // password: '123123',
    });

    expect(updatedUser.name).toBe('maicao');
    expect(updatedUser.email).toBe('maicao@mail.com');
  });

  it('should be not able change a email to a existing email', async () => {
    await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Teste',
      email: 'teste@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'maicao',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'maicao',
      email: 'maicao@mail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
    // expect(updatedUser.email).toBe('maicao@mail.com');
  });

  it('should not be able to update the password without a old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'maicao',
        email: 'maicao@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'maicao',
        email: 'maicao@mail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with a non-user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-user',
        name: 'maicao',
        email: 'maicao@mail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
