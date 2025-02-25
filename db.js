import mysql from 'mysql2/promise';


import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3307
});

export async function executeQuery(query, params = []) {
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (err) {
        console.error("Erreur SQL :", err);
        throw err;
    }
}

export async function getFiles(query) {
    if (!query.startsWith('SELECT')) {
        throw new Error('La requête doit commencer par SELECT');
    }
    return await executeQuery(query);
}