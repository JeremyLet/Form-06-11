// URL de l'API sur Vercel (remplace par l'URL réelle)
const API_URL = 'https://alix-d38t5b6mh-jeremylets-projects.vercel.app/submit'; // Remplace par l'URL de ton API sur Vercel

// Sélection du formulaire par son ID
const form = document.getElementById('monFormulaire'); // Assure-toi que l'ID correspond à ton formulaire

// Vérifie que le formulaire est trouvé avant d'ajouter l'écouteur d'événement
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        // Récupérer les données du formulaire sous forme d'un objet
        const formData = new FormData(form);
        const data = {
            nomClient: formData.get('nomClient'), // Données du champ "Nom du client"
            prestation: formData.get('prestation'), // Données du champ "Prestation réalisée"
            heuresHectares: formData.get('heuresHectares'), // Données du champ "Heures / Hectares"
            travailTermine: formData.get('travailTermine'), // Données du champ "Travail terminé ?"
            observations: formData.get('observations') // Données du champ "Observations particulières"
        };

        // Affichage des données dans la console pour vérifier
        console.log('Données envoyées :', data);

        // Envoi des données vers l'API Vercel
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indique que le contenu envoyé est du JSON
            },
            body: JSON.stringify(data) // Transformation des données en JSON
        })
            .then(response => response.json()) // Si la réponse est en JSON, on la parse
            .then(responseData => {
                // Affichage d'un message de succès
                alert('Formulaire soumis avec succès!');
                console.log('Réponse de l\'API :', responseData);

                // Réinitialiser le formulaire après soumission
                form.reset();
            })
            .catch(error => {
                // Si une erreur se produit lors de la soumission
                alert('Erreur lors de la soumission du formulaire : ' + error);
                console.error('Erreur API:', error);
            });
    });
} else {
    console.error('Le formulaire n\'a pas été trouvé.');
}
