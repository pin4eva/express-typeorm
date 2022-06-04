import dotenv from 'dotenv';

dotenv.config();

// ENV KEY VARIABLES
const SERVER_PORT: number = parseInt(<string>process.env.SERVER_PORT, 10) || 4000;
const SERVER_HOST_NAME: string = process.env.SERVER_HOST_NAME || 'localhost';
const MONGO_URL: string = process.env.MONGO_URL!;
const JWT_SECRET: string = process.env.JWT_SECRET || 'somerandomtextintutornia';
const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || 'somerandomtextintutornia123456789';
const FRONTEND_URL: string = process.env.FRONTEND_URL || 'http://localhost:3000';
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const REDIS_PORT: number = parseInt(<string>process.env.REDIS_PORT, 10) || 6379;
const REDIS_HOST: string = process.env.REDIS_HOST || '165.227.90.103';
const REDIS_DB: number = parseInt(<string>process.env.REDIS_DB, 10) || 3;
const REDIS_SECRET: string = process.env.REDIS_SECRETE || 'thisisthetutorniasecrete';
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || 'Ph1dHyM97NqWFOuoC1JtQT1c05RhMzMZ';
const FACEBOOK_APP_ID: string = process.env.FACEBOOK_APP_ID || '';
const AWS_SECRET: string = process.env.AWS_SECRET || '';
const AWS_ACCESS_ID: string = process.env.AWS_ACCESSID || '';
const S3_BUCKET_NAME: string = process.env.S3_BUCKET_NAME || '';
const S3_HOST_URL: string = process.env.S3_HOST_URL || '';
const S3_REGION: string = process.env.S3_REGION || 'eu-west-3';
const PAYSTACK_URL: string = process.env.PAYSTACK_URL || '';
const PAYSTACK_SECRET_KEY: string = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_PUBLIC_KEY: string = process.env.PAYSTACK_PUBLIC_KEY || '';
const TWILIO_ACCOUNT_SID: string =
  process.env.TWILIO_ACCOUNT_SID || 'AC2b754517b5b6bfcc920d8fa2dc6c558b';
const TWILIO_AUTH_TOKEN: string =
  process.env.TWILIO_AUTH_TOKEN || '520534bbf2a3f273cb285707d8f6167c';

const PHONE_NUMBER = process.env.PHONE_NUMBER || '+7248603836';
const AFRICA_TALK_APP_NAME = process.env.AFRICA_TALK_APP_NAME || 'Sandbox';
const AFRICA_TALK_USERNAME = process.env.AFRICA_TALK_USERNAME || 'Sandbox';
const AFRICA_TALK_API_KEY = process.env.AFRICA_TALK_API_KEY || '';

const SESSION_ID = process.env.SESSION_ID || 'tutornia-Id';

const SERVER = {
  hostname: SERVER_HOST_NAME,
  port: SERVER_PORT,
};

const GENERAL = {
  phoneNumber: PHONE_NUMBER,
  sessionId: SESSION_ID,
};

const MONGO = {
  url: MONGO_URL,
  // others ...
};

const SECRET = {
  jwt: JWT_SECRET,
  refresh: JWT_REFRESH_TOKEN_SECRET,
  // others ...
};

const URL = {
  clientUrl: FRONTEND_URL,
  backendUrl: `http://${SERVER.hostname}:${SERVER.port}`,
  // others ...
};

const REDIS = {
  PORT: REDIS_PORT,
  HOST: REDIS_HOST,
  DB: REDIS_DB,
  PASSWORD: REDIS_PASSWORD,
  SECRET: REDIS_SECRET,
  // others ...
};

const TWILIO = {
  ACCOUNT_SID: TWILIO_ACCOUNT_SID,
  AUTH_TOKEN: TWILIO_AUTH_TOKEN,
};
const AFRICA_TALK = {
  username: AFRICA_TALK_USERNAME,
  appName: AFRICA_TALK_APP_NAME,
  apiKey: AFRICA_TALK_API_KEY,
};

const PASSPORT = {
  fbId: FACEBOOK_APP_ID,
  callbackUrl: `${FRONTEND_URL}/auth/facebook`,
  // others ...
};

const AWS = {
  AWS_SECRET: AWS_SECRET,
  AWS_ACCESS_ID: AWS_ACCESS_ID,
  AWS_BUCKET: S3_BUCKET_NAME,
  AWS_HOST: S3_HOST_URL,
  AWS_REGION: S3_REGION,
  // others ...
};

const PAYSTACK = {
  url: PAYSTACK_URL,
  secret_key: PAYSTACK_SECRET_KEY,
  public_key: PAYSTACK_PUBLIC_KEY,
  // others ...
};

const config = {
  server: SERVER,
  mongo: MONGO,
  url: URL,
  auth: SECRET,
  node_env: NODE_ENV,
  redis: REDIS,
  passport: PASSPORT,
  aws: AWS,
  paystack: PAYSTACK,
  twilio: TWILIO,
  general: GENERAL,
  africaTalk: AFRICA_TALK,
  // others ...
};

export default config;
