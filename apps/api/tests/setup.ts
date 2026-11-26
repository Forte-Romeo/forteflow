// Provide a non-secret database URL for environment validation during tests.
const env = (
  globalThis as typeof globalThis & {
    process: { env: Record<string, string | undefined> };
  }
).process.env;

env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/forteflow_test';

// Ensure the application uses its test environment.
env.NODE_ENV = 'test';
