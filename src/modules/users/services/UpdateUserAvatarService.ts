import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

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

    await userRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
