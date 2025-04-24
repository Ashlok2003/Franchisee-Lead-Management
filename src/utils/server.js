import cors from 'cors';
import express from 'express';
import { errorHandler } from '../middlewares/errors.js';
import routes from '../routes/index.js';

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(errorHandler);
app.get('/api', routes);

const startServer = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};

export default startServer;
