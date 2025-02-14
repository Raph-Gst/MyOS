import mysql from 'mysql2/promise';

// Configuration de la connexion à MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Starwars2002?', // Remplace par ton vrai mot de passe
    database: 'file_explorer_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3307
});

// Fonction pour exécuter une requête SQL
export async function executeQuery(query, params = []) {
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (err) {
        console.error("Erreur SQL :", err);
        throw err;
    }
}


// Nouvelle fonction pour récupérer des fichiers selon une requête
export async function getFiles(query) {
    if (!query.startsWith('SELECT')) {
        throw new Error('La requête doit commencer par SELECT');
    }
    return await executeQuery(query);
}