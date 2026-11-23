import express from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './lib/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found-handler.js';

const app = express();

// Disable Express technology disclosure.
app.disable('x-powered-by');

// Log incoming HTTP requests and their responses.
app.use(pinoHttp({ logger }));

// Parse incoming JSON request bodies.
app.use(express.json());

// Handle unmatched routes.
app.use(notFoundHandler);

// Handle application errors.
app.use(errorHandler);

export { app };
