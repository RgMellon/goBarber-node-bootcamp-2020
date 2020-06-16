import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAcatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able update a user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able update avatar from non existing user', async () => {
    expect(
      updateUserAvatar.execute({
        userId: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating a new one', async () => {
    // retorna a funcao que desejo espionar
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
