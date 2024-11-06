const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const AIRTABLE_BASE_ID = "appev8LbrXqkpUt6g";
const AIRTABLE_TABLE_NAME = "tbl67d8eZCOyy8JOO";
const AIRTABLE_API_KEY = "patV8jMWMMq3TTgrM.bf8bb3b761a9a2639cd912f7d59bc701268abe134583e89d4d2c77b29966ebfa";

// Route pour la soumission du formulaire
app.post("/submit", async (req, res) => {
    const { fields } = req.body;

    // Validation (vous pouvez ajuster selon les besoins)
    if (!fields.clientName || !fields.prestation || !fields.hours || !fields.workDone) {
        return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    // Préparer la requête pour Airtable
    const airtableData = {
        fields: {
            "Nom du client": fields.clientName,
            "Prestation réalisée": fields.prestation,
            "Nombre d'heures / hectares du travail effectué": fields.hours,
            "Travail terminé ?": fields.workDone,
            "Observations particulières": fields.observations,
        }
    };

    try {
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airtableData)
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(400).json(data);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur de serveur." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
