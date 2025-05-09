
interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    PORT: number;
}

const getEnv = (): ProcessEnv => {

    const NODE_ENV = getEnum('NODE_ENV', ['development', 'production', 'test']);
    const API_URL  = getString('API_URL');
    const PORT     = getInteger('PORT');
    
    return {
        NODE_ENV,
        API_URL,
        PORT
    };

};

const getString = (key: string): string => {

    const value = process.env[key];

    if(typeof value !== 'string' || value.trim() === '') {
        throw new Error(`${key} is not set or is empty`);
    }

    return value;

};

const getNumber = (key: string): number => {

    const raw = getString(key);
    const value = Number(raw);

    if(isNaN(value)) {
        throw new Error(`${key} must be a valid number`);
    }

    return value;

};

const getInteger = (key: string): number => {

    const value = getNumber(key);
    
    if(!Number.isInteger(value)) {
        throw new Error(`${key} must be a valid integer`);
    }

    return value;

};

const getEnum = <T extends string>(key: string, allowed: T[]): T => {

    const value = getString(key);

    if (!allowed.includes(value as T)) {
        throw new Error(`${key} must be one of: ${allowed.join(', ')}`);
    }

    return value as T;

};

const env = getEnv();
export default env;