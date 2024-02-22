// config.ts

import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const EnvSchema = z.object({
  DATABASE_URL: z
    .string({
      description: 'Postgres Connection string',
      required_error: 'You forgot to add a database URL',
    })
    .url()
    .min(3),
  NODE_ENV: z
    .enum(['development', 'test', 'production'], {
      description: 'This gets updated depending on your environment',
    })
    .default('development'),
  PORT: z.coerce
    .number({
      description:
        '.env files convert numbers to strings, therefore we have to enforce them to be numbers',
    })
    .positive()
    .max(65536, 'Port should be >= 0 and < 65536')
    .default(3000),
  JWT_SECRET: z
    .string({
      description: 'JWT secret key',
      required_error: '🔒 JWT_SECRET is required. Please provide a JWT secret key.',
    })
    .min(8, 'JWT Secret key must be at least 8 characters long'),
  JWT_ACCESS_SECRET: z
    .string({
      description: 'JWT access token secret key',
      required_error: '🔒 JWT_ACCESS_SECRET is required. Please provide a JWT access token secret key.',
    })
    .min(8, 'JWT Access Secret key must be at least 8 characters long'),
  JWT_REFRESH_SECRET: z
    .string({
      description: 'JWT refresh token secret key',
      required_error: '🔒 JWT_REFRESH_SECRET is required. Please provide a JWT refresh token secret key.',
    })
    .min(8, 'JWT Refresh Secret key must be at least 8 characters long'),
});

export const env = EnvSchema.parse(process.env);

export default {
  DATABASE_URL: env.DATABASE_URL,
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  JWT_SECRET: env.JWT_SECRET,
  JWT_ACCESS_SECRET: env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET,
};
