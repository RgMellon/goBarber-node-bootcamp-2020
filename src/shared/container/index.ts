import { container } from 'tsyringe';

import '@modules/users/providers/';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/'
/**  IAppointmentsRepository garante que a var que passamos como
 *  segundo parametro tenha o formato do IAppointmentsRepository.
 * */

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// container.registerSingleton<IUserTokensRepository>('UserTokensRepository');
