// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

// interface IResponse {
//   user: User;
//   token: string;
// }

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Users does not exists');
    }

    const { token } = await this.userTokensRepository.generate(userExists.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;