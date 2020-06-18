import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayhAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );
    /*
    * [ Appointment {
        id: 'ffef24c8-e0f0-464c-b5fe-c19aad5dfd04',
        date: 2020-08-21T11:00:00.000Z,
        provider_id: 'user_id' },
      Appointment {
        id: '0e48fcbd-cf6f-4678-a8f6-39a43cef835f',
        date: 2020-08-21T13:00:00.000Z,
        provider_id: 'user_id' } ]
    */

    const hourStart = 8;
    const currentDate = new Date(Date.now());
    const eachHourArray = Array.from(
      {
        length: 10,
      },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayhAvailabilityService;
