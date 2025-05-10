import {
    getString,
    getNumber,
    getInteger,
    getEnum,
    getEnv,
} from '../../src/config/env';

describe('Environment Variable Config Tests', () => {

    const ORIGINAL_ENV = process.env;


    beforeEach(() => {
        jest.resetModules(); // Clears cached env.ts module if imported in getEnv
        process.env = { ...ORIGINAL_ENV }; // Restore original env
    });

    afterAll(() => {
        process.env = ORIGINAL_ENV; // Clean up
    });

    // ===== Tests for getString function =====
    describe('getString', () => {

        it('should return the value when set', () => {
            
            process.env.TEST_KEY = 'value';
            expect(getString('TEST_KEY')).toBe('value');
        
        });

        it('should throw an error if not set', () => {

            delete process.env.TEST_KEY;
            expect(() => getString('TEST_KEY')).toThrow('TEST_KEY is not set or is empty');

        });

        it('should throw an error if empty', () => {

            process.env.TEST_KEY = '     ';
            expect(() => getString('TEST_KEY')).toThrow('TEST_KEY is not set or is empty');

        });

    });

    // ===== Tests for getNumber function =====
    describe('getNumber', () => {

        it('should return a number when valid', () => {

            process.env.TEST_KEY = '42';
            expect(getNumber('TEST_KEY')).toBe(42);

        });

        it('should throw an error if not a number', () => {

            process.env.TEST_KEY = 'ten';
            expect(() => getNumber('TEST_KEY')).toThrow('TEST_KEY must be a valid number');

        });

    });

    // ===== Tests for getInteger function =====
    describe('getInteger', () => {

        it('should return a integer when valid', () => {

            process.env.TEST_KEY = '42';
            expect(getInteger('TEST_KEY')).toBe(42);

        });

        it('should throw an error if not a integer', () => {

            process.env.TEST_KEY = '42.42';
            expect(() => getInteger('TEST_KEY')).toThrow('TEST_KEY must be a valid integer');

        });

    });

    // ===== Tests for getEnum function =====
    describe('getEnum', () => {

        it('should return the enum value if valid', () => {

            process.env.TEST_KEY = 'production';
            expect(getEnum('TEST_KEY', ['development', 'production', 'test'])).toBe('production');

        });

        it('should throw if not in allowed list', () => {

            process.env.TEST_KEY = 'staging';
            expect(() => getEnum('TEST_KEY', ['development', 'production', 'test']))
              .toThrow('TEST_KEY must be one of: development, production, test');

          });

    });

    // ===== Tests for getEnv function =====
    describe('getEnv', () => {

        it('should return a fully parsed env config', () => {

          process.env.NODE_ENV = 'development';
          process.env.API_URL = 'http://localhost:3000';
          process.env.PORT = '3000';
          process.env.DB_USER = 'user';
          process.env.DB_HOST = 'localhost';
          process.env.DB_NAME = 'auth';
          process.env.DB_PASS = 'password';
          process.env.DB_PORT = '5432';
    
          const env = getEnv();
    
          expect(env).toEqual({
            NODE_ENV: 'development',
            API_URL: 'http://localhost:3000',
            PORT: 3000,
            DB_USER: 'user',
            DB_HOST: 'localhost',
            DB_NAME: 'auth',
            DB_PASS: 'password',
            DB_PORT: 5432,
          });

        });
    
        it('should throw if required env var is missing', () => {

          delete process.env.API_URL;
          expect(() => getEnv()).toThrow('API_URL is not set or is empty');

        });

      });

});