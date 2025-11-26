// Importation du framework Express, essentiel pour un serveur Node.js.
const express = require('express');

// Initialisation de l'application Express.
const app = express();

// Définition du port d'écoute. Render fournit le port via process.env.PORT.
const port = process.env.PORT || 3000;

// NOUVEAU : Middleware pour traiter les corps de requêtes JSON (nécessaire pour /api/chat)
app.use(express.json()); 

// CORRECTION : Middleware pour servir les fichiers statiques depuis le dossier 'public'.
// Cela permet à Express de trouver index.html, CSS, etc., DANS 'public'.
app.use(express.static('public')); 

// 1. Route de base (GET /)
// CORRECTION : Sert explicitement le fichier index.html qui se trouve DANS le dossier public.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 2. Route de Test de l'Agent (GET /api/status)
// Pour vérifier la connexion initiale du client au serveur.
app.get('/api/status', (req, res) => {
    // Réponse JSON que le client attend.
    res.status(200).json({ status: 'OK', message: 'Agent Eon 5.1 API prêt pour la biométrie.' });
});

// 3. Route de Chat (POST /api/chat)
// NOUVEAU : Simule la réponse de l'Agent Eon.
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    const authKey = req.body.key;

    // La clé secrète est Bibi8683 selon votre code client.
    const correctKey = 'Bibi8683'; 

    // Vérification de la clé secrète pour l'authentification
    if (authKey !== correctKey) {
        return res.status(403).json({ response: 'Accès non autorisé. Clé manquante ou invalide.' });
    }

    let responseText = `J'ai bien reçu votre message: "${userMessage}". Mon intelligence artificielle est en phase d'apprentissage.`;
    
    if (userMessage.toLowerCase().includes('biométrie') || userMessage.toLowerCase().includes('caméra')) {
        responseText = "Oui, mon objectif actuel est d'intégrer la reconnaissance biométrique. Nous devons passer au code de détection faciale maintenant.";
    }

    res.status(200).json({ response: responseText });
});


// Démarrage du serveur.
app.listen(port, () => {
  console.log(`Agent Éon 5.1 est à l'écoute sur le port ${port}`);
});
