import 'dotenv/config';

export const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL;
export const DATABASE_URL = process.env.DATABASE_URL;

console.log(
  '\n',
  {
    RABBIT_MQ_URL: RABBIT_MQ_URL,
    DATABASE_URL: DATABASE_URL,
  },
  '\n',
);
