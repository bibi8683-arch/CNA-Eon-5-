// Importation du framework Express, essentiel pour un serveur Node.js.
const express = require('express');

// Initialisation de l'application Express.
const app = express();

// Définition du port d'écoute. Render fournit le port via process.env.PORT.
const port = process.env.PORT || 3000;

// MODIFICATION CLÉ : Middleware pour servir les fichiers statiques (index.html, CSS, JS client, etc.)
// Express va maintenant chercher automatiquement ces fichiers dans le dossier 'public'.
// Le dossier 'public' doit contenir l'index.html.
app.use(express.static('public')); 

// 1. Définition de la route de base (GET /)
// Elle sert explicitement le fichier index.html qui se trouve DANS le dossier public.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 2. Route de Test de l'Agent (GET /api/status)
// C'est la route que le client appelle pour vérifier la connexion.
app.get('/api/status', (req, res) => {
    // Réponse JSON que le client (index.html) attend.
    res.status(200).json({ status: 'OK', message: 'Agent Eon 5.0 API prêt pour la biométrie.' });
});

// Démarrage du serveur.
app.listen(port, () => {
  console.log(`Agent Éon 5.0 est à l'écoute sur le port ${port}`);
});
