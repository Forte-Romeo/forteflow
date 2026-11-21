import express from 'express';

const app = express();

// Disable Express technology disclosure.
app.disable('x-powered-by');

// Parse incoming JSON request bodies.
app.use(express.json());

export { app };
