import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { envSchema } from './env.schema.js';

// Resolve the API workspace's .env file.
const envFilePath = fileURLToPath(new URL('../../.env', import.meta.url));

// Load environment variables.
dotenv.config({ path: envFilePath });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment configuration:');

  for (const issue of parsedEnv.error.issues) {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  }

  process.exit(1);
}

export const env = parsedEnv.data;
