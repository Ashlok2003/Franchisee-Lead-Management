import { createPool } from 'mysql2/promise';

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4',
    timezone: 'Z',
});

pool.getConnection()
    .then((conn) => {
        console.log('MySQL Connection Pool Initialized');
        conn.release();
    })
    .catch((err) => {
        console.error('Failed to Initialize MySQL Pool:', err.message);
        process.exit(1);
    });

export default pool;
