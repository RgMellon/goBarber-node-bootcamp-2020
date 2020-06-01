import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userService = container.resolve(CreateUserService);
    const user = await userService.execute({ email, name, password });

    delete user.password;

    return response.json(user);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const updateAvatarService = container.resolve(UpdateUserAvatarService);

  //   const user = await updateAvatarService.execute({
  //     userId: request.user.id,
  //     avatarFileName: request.file.filename,
  //   });

  //   delete user.password;

  //   return response.json(user);
  // }
}
