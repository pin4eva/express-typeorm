import { redis } from './redis';
import { phoneOtpConfirmationPrefix } from './constants';
import sendMessage from './sendMessage';
import { generateOTP } from './generateOtp';

export const createAndSendConfirmationOtpToken = async (userId: number, phoneNumber: string) => {
  const token = generateOTP();
  await redis.set(phoneOtpConfirmationPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 day expiration
  await sendMessage({ phoneNumber: phoneNumber, message: `Your tutornia otp is ${token}` });
};
