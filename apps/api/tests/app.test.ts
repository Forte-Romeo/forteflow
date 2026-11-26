import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import { app } from '../src/app.js';
import { checkDatabaseConnection } from '../src/db/database.js';

// Replace the real database connection with a mock.
vi.mock('../src/db/database.js', () => ({
  checkDatabaseConnection: vi.fn(),
}));

const mockCheckDatabaseConnection = vi.mocked(checkDatabaseConnection);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('API baseline', () => {
  it('should return API information', async () => {
    const response = await request(app).get('/api/v1').expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        name: 'ForteFlow API',
        version: 'v1',
        status: 'running',
      },
    });
  });
});

describe('Health checks', () => {
  it('should return alive when the API is running', async () => {
    const response = await request(app).get('/api/v1/health/live').expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        status: 'alive',
      },
    });

    // Liveness must not depend on PostgreSQL.
    expect(mockCheckDatabaseConnection).not.toHaveBeenCalled();
  });

  it('should return ready when the database is available', async () => {
    mockCheckDatabaseConnection.mockResolvedValue(undefined);

    const response = await request(app).get('/api/v1/health/ready').expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        status: 'ready',
        dependencies: {
          database: 'connected',
        },
      },
    });

    expect(mockCheckDatabaseConnection).toHaveBeenCalledOnce();
  });

  it('should return 503 when the database is unavailable', async () => {
    mockCheckDatabaseConnection.mockRejectedValue(
      new Error('Database connection failed'),
    );

    const response = await request(app).get('/api/v1/health/ready').expect(503);

    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'The API is not ready to handle requests.',
      },
    });

    // Internal database errors must not leak into the response.
    expect(response.body.error.message).not.toContain(
      'Database connection failed',
    );
  });
});

describe('Error handling', () => {
  it('should return 404 for an unknown route', async () => {
    const response = await request(app)
      .get('/api/v1/does-not-exist')
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('ROUTE_NOT_FOUND');
  });
});
