import AppError from '@shared/errors/AppError';

import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recovery the password using your email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeEmailProvider();

    // guarda a referencia do metodo
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@mail.com',
      password: '123456',
    });

    sendForgotPasswordEmail.execute({
      email: 'jhondoe@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
    // expect(user).toEqual(user);
  });
});
