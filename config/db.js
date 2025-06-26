import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database successfully for order service.');
        connection.release();
    } catch (err) {
        console.error('❌ Failed to connect to MySQL database for order service.');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        console.error('Stack trace:', err.stack);
        process.exit(1);
    }
})();

export default pool;
