require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Ajouter cors
const app = express();

// Activer CORS
app.use(cors());

// Middleware pour gérer les données JSON
app.use(express.json());

const airtableUrl = 'https://api.airtable.com/v0/appev8LbrXqkpUt6g/tbl67d8eZCOyy8JOO';
const airtableApiKey = process.env.AIRTABLE_API_KEY; // Utiliser le jeton d'accès à partir de .env

// Route POST pour gérer la soumission du formulaire
app.post('/submit', async (req, res) => {
    const { nomOuvrier, email } = req.body;

    const data = {
        fields: {
            "name": nomOuvrier,
            "email": email
        }
    };

    try {
        const response = await axios.post(airtableUrl, data, {
            headers: {
                'Authorization': `Bearer ${airtableApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ message: 'Tâche enregistrée avec succès', data: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Erreur d\'enregistrement', error: error.message });
    }
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
