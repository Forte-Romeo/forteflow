import { env } from './config/env.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  console.log(`ForteFlow API listening on port ${env.PORT} (${env.NODE_ENV})`);
});

export { server };
