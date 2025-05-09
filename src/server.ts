import 'dotenv/config';
import env from './config/env';
import express from 'express';

const app = express();
const port = env.PORT;

app.get('/', (_, res) => {
    res.send(`Running in ${env.NODE_ENV} mode`);
});

app.listen(port, () => {
    console.log(`Server running on ${env.API_URL}:${port}`);
});