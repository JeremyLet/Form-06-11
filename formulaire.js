// URL de ton API sur Vercel (remplace par l'URL réelle)
const API_URL = 'https://alix-d38t5b6mh-jeremylets-projects.vercel.app/submit'; // Remplace par l'URL de ton API sur Vercel

// Sélection du formulaire
const form = document.getElementById('monFormulaire'); // Assure-toi que l'ID correspond à ton formulaire

// Écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut de soumettre un formulaire

    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = {
        nomClient: formData.get('nomClient'),
        prestation: formData.get('prestation'),
        heuresHectares: formData.get('heuresHectares'),
        travailTermine: formData.get('travailTermine'),
        observations: formData.get('observations')
    };

    // Afficher les données dans la console (pour tester)
    console.log(data);

    // Envoi des données vers l'API sur Vercel
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => {
            // Affichage d'un message de succès
            alert('Formulaire soumis avec succès!');
            // Réinitialisation du formulaire après soumission
            form.reset();
        })
        .catch(error => {
            // Affichage d'un message d'erreur si quelque chose ne va pas
            alert('Erreur lors de la soumission du formulaire : ' + error);
        });
});
