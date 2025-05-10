// tests/db.test.ts
import { testDatabaseConnection } from '../../src/config/db';

describe('PostgreSQL Connection', () => {
  it('should connect successfully', async () => {
    await expect(testDatabaseConnection()).resolves.not.toThrow();
  });
});