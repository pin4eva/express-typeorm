import config from '../config';

export const sendAirtime = ({ phoneNumber, amount }: { phoneNumber: string; amount: number }) => {
  const AfricasTalking = require('africastalking')({
    apiKey: config.africaTalk.apiKey,
    username: config.africaTalk.username,
  });
  const airtime = AfricasTalking.AIRTIME;

  const send = () => {
    const options = {
      recipients: [
        {
          phoneNumber: phoneNumber,
          currencyCode: 'NGN',
          amount: `${amount}`,
        },
      ],
    };
    airtime
      .send(options)
      .then((response: any) => {
        return `You have received a ${response[0]?.amount} airtime on this number ${phoneNumber}`;
      })
      .catch((error: any) => {
        throw new Error(error?.errorMessage || 'Something went wrong while sending airtime');
      });
  };
  send();
};
