import { Pool } from 'pg';
import { mockQuery } from '../mocks/pg';
import { testDatabaseConnection } from '../../src/config/db';

describe('testDatabaseConnection', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve when query succeeds', async () => {

    mockQuery.mockResolvedValueOnce({ rows: [{ result: 1 }] });

    await expect(testDatabaseConnection()).resolves.not.toThrow();

  });

  it('should throw an error when query fails', async () => {

    mockQuery.mockRejectedValueOnce(new Error('Connection timeout'));

    await expect(testDatabaseConnection()).rejects.toThrow(
      'Database connection failed: Connection timeout'
    );

  });
  
});
