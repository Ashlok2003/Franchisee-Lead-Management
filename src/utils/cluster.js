import cluster from 'node:cluster';
import os from 'node:os';
import startServer from './server.js';

const numCPUs = os.cpus().length;

export const setupCluster = () => {
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} running`);
        Array.from({ length: numCPUs }).forEach(() => cluster.fork());
        cluster.on('exit', (worker) => console.log(`Worker ${worker.process.pid} died`));
    } else {
        startServer();
    }
};
