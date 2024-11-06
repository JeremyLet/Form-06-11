// Sélectionner le formulaire
const formulaire = document.getElementById('formulaire');

formulaire.addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérer les valeurs du formulaire
    const nomOuvrier = document.getElementById('nomOuvrier').value;
    const email = document.getElementById('email').value;

    // Préparer les données à envoyer
    const data = {
        nomOuvrier: nomOuvrier,
        email: email
    };

    // Faire la requête POST vers le serveur Express
    try {
        const response = await fetch('https://alix-jgwx8ni8i-jeremylets-projects.vercel.app/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Convertir les données en JSON
        });

        const result = await response.json();

        // Vérifier si la requête a réussi
        if (response.ok) {
            alert(result.message);
            console.log('Réponse serveur:', result.data);
        } else {
            alert('Erreur lors de l\'enregistrement.');
            console.error('Erreur serveur:', result);
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
    }
});
