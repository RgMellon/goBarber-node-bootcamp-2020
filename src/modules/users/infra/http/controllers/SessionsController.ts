import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
