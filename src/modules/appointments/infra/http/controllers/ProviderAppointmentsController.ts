import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

// create, update, show, index

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.body;
    const provider_id = request.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(appointments);
  }
}
