import config from '../config';
import twilio from './twilio';

interface IParams {
  message: string;
  phoneNumber: string;
}

export default async ({ message, phoneNumber }: IParams) => {
  await twilio.messages.create({
    body: message,
    from: config.general.phoneNumber,
    to: phoneNumber,
  });
};
