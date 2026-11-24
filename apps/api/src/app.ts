import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found-handler.js';

const app = express();

// Disable Express technology disclosure.
app.disable('x-powered-by');

// Log incoming HTTP requests and their responses.
app.use(pinoHttp({ logger }));

// Apply HTTP security headers.
app.use(helmet());

// Configure Cross-Origin Resource Sharing.
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  }),
);

// Parse incoming JSON request bodies.
app.use(express.json());

// Handle unmatched routes.
app.use(notFoundHandler);

// Handle application errors.
app.use(errorHandler);

export { app };
