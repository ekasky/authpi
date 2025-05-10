
interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    PORT: number;
    DB_USER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASS: string;
    DB_PORT: number;
}

export const getEnv = (): ProcessEnv => {

    const NODE_ENV = getEnum('NODE_ENV', ['development', 'production', 'test']);
    const API_URL  = getString('API_URL');
    const PORT     = getInteger('PORT');
    
    // PostgreSQL DB varaibles
    const DB_USER = getString('DB_USER');
    const DB_HOST = getString('DB_HOST');
    const DB_NAME = getString('DB_NAME');
    const DB_PASS = getString('DB_PASS');
    const DB_PORT = getInteger('DB_PORT'); 
    
    return {
        NODE_ENV,
        API_URL,
        PORT,
        DB_USER,
        DB_HOST,
        DB_NAME,
        DB_PASS,
        DB_PORT
    };

};

export const getString = (key: string): string => {

    const value = process.env[key];

    if(typeof value !== 'string' || value.trim() === '') {
        throw new Error(`${key} is not set or is empty`);
    }

    return value;

};

export const getNumber = (key: string): number => {

    const raw = getString(key);
    const value = Number(raw);

    if(isNaN(value)) {
        throw new Error(`${key} must be a valid number`);
    }

    return value;

};

export const getInteger = (key: string): number => {

    const value = getNumber(key);
    
    if(!Number.isInteger(value)) {
        throw new Error(`${key} must be a valid integer`);
    }

    return value;

};

export const getEnum = <T extends string>(key: string, allowed: T[]): T => {

    const value = getString(key);

    if (!allowed.includes(value as T)) {
        throw new Error(`${key} must be one of: ${allowed.join(', ')}`);
    }

    return value as T;

};

const env = getEnv();
export default env;