import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Just vailable user can update avatar', 401);
    }

    if (user.avatar) {
      const userPathAvatarFile = path.join(uploadConfig.tempPath, user.avatar);
      const existUserAvatarFilePath = await fs.promises.stat(
        userPathAvatarFile,
      );

      if (existUserAvatarFilePath) {
        await fs.promises.unlink(userPathAvatarFile);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
