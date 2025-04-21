import 'dotenv/config';
import express from 'express';
import setupSwagger from '../config/swagger.js';
import { errorHandler } from '../middlewares/errors.js';
import routes from '../routes/index.js';

const startServer = () => {
    const app = express();

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
