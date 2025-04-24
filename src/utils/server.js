import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import setupSwagger from '../config/swagger.js';
import { errorHandler } from '../middlewares/errors.js';
import routes from '../routes/index.js';

const whitelist = ['http://localhost:5173', 'https://frontend-domain.com'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const startServer = () => {
    const app = express();

    app.use(cors(corsOptions));
    app.use(express.json());

    setupSwagger(app);

    app.use('/api', routes);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    console.log('Server is starting....\n');
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
};

export default startServer;
