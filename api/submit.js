// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const axios = require('axios');

// Utiliser les variables d'environnement
const AIRTABLE_BASE_URL = process.env.AIRTABLE_BASE_URL;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

module.exports = async (req, res) => {
    // Vérifier que la méthode de la requête est POST
    if (req.method === 'POST') {
        // Ajouter les en-têtes CORS pour autoriser les requêtes venant de ton domaine
        res.setHeader('Access-Control-Allow-Origin', 'https://jeremylet.github.io'); // Ton domaine GitHub Pages
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Traitement des données de la requête
        const data = req.body;

        try {
            // Ajouter ici la logique pour envoyer les données à Airtable ou autre
            // Exemple: await someDatabaseFunction(data);

            res.status(200).json({ message: 'Données reçues avec succès' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors du traitement des données' });
        }
    } else {
        // Si ce n'est pas une requête POST, on renvoie une erreur
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
};