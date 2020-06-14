import ISendMailDTOS from '../dtos/ISendMailDTOS';

export default interface IMailProvider {
  sendMail(data: ISendMailDTOS): Promise<void>;
}
