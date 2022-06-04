import config from '../config';

export default require('twilio')(config.twilio.ACCOUNT_SID, config.twilio.AUTH_TOKEN, {
  lazyLoading: true,
});
