// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const axios = require('axios');

// Utiliser les variables d'environnement
const AIRTABLE_BASE_URL = process.env.AIRTABLE_BASE_URL;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Récupérer les données du formulaire
            const { nomClient, prestation, heuresHectares, travailTermine, observations } = req.body;

            // Préparer les données pour Airtable
            const data = {
                fields: {
                    'Nom du client': nomClient,
                    'Prestation réalisée': prestation,
                    'Nombre d\'heures / hectares du travail effectué': heuresHectares,
                    'Travail terminé ?': travailTermine,
                    'Observations particulières': observations,
                }
            };

            // Envoi des données vers Airtable
            const response = await axios.post(AIRTABLE_BASE_URL, data, {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            // Répondre au formulaire avec un message de succès
            res.status(200).json({ message: 'Données envoyées avec succès' });
        } catch (error) {
            // Si une erreur se produit, renvoyer un message d'erreur
            res.status(500).json({ error: 'Erreur lors de l\'envoi des données', details: error.message });
        }
    } else {
        // Si ce n'est pas une requête POST, renvoyer une erreur
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
};
