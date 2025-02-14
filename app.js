import express from 'express';
import { executeQuery } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

// Ajouter des en-têtes CORS manuellement
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permettre toutes les origines (ou spécifie ton origine)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Exemple de route pour récupérer les fichiers
app.get('/files', async (req, res) => {
    try {
        console.log("Requête reçue sur /files");
        const results = await executeQuery('SELECT * FROM files WHERE folder_id = 8');
        console.log("Résultats SQL :", results);
        res.json(results);
    } catch (err) {
        console.error("Erreur SQL :", err); // Log l'erreur SQL dans la console
        res.status(500).json({ error: err.message });
    }
});


app.get('/files_all', async (req, res) => {
    try {
        console.log("Requête reçue sur /files");
        const results = await executeQuery('SELECT * FROM files');
        console.log("Résultats SQL :", results);
        res.json(results);
    } catch (err) {
        console.error("Erreur SQL :", err); // Log l'erreur SQL dans la console
        res.status(500).json({ error: err.message });
    }
});

app.get('/folders_all', async (req, res) => {
    try {
        console.log("Requête reçue sur /files");
        const results = await executeQuery('SELECT * FROM folders');
        console.log("Résultats SQL :", results);
        res.json(results);
    } catch (err) {
        console.error("Erreur SQL :", err); // Log l'erreur SQL dans la console
        res.status(500).json({ error: err.message });
    }
});



app.listen(port, () => {
    console.log(`Serveur API démarré sur http://localhost:${port}`);
});
