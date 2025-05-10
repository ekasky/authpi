import 'dotenv/config';
import env from './config/env';
import express from 'express';
import { testDatabaseConnection } from './config/db';

const app = express();
const port = env.PORT;

app.get('/', (_, res) => {
    res.send(`Running in ${env.NODE_ENV} mode`);
});

const startServer = async (): Promise<void> => {

    try {

        await testDatabaseConnection();

        app.listen(port, () => {
            console.log(`Server running on ${env.API_URL}:${port}`);
        });

    } catch(error: any) {

        console.error(`Failed to start the server: ${error}`);
        process.exit(1);
    }

};

startServer();