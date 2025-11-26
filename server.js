// Importation du framework Express, essentiel pour un serveur Node.js.
const express = require('express');

// Initialisation de l'application Express.
const app = express();

// Définition du port d'écoute. Render fournit le port via process.env.PORT.
const port = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques (comme un futur index.html).
// Cela permet au serveur de livrer la partie cliente de l'application.
app.use(express.static('public'));

// 1. Définition de la route principale (GET /)
// C'est ce qui répond quand vous accédez à https://eon-5-autonome.onrender.com/
app.get('/', (req, res) => {
  // Le serveur répond 200 (OK) et envoie un simple message.
  // Dans la prochaine étape, nous enverrons le fichier index.html du client.
  res.status(200).send('Serveur Agent Éon 5.0 opérationnel (Code 200 OK)');
});

// 2. Route de Test de l'Agent (GET /api/status)
// Pour vérifier si l'API est prête.
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Agent Eon 5.0 API prêt pour la biométrie.' });
});

// Démarrage du serveur.
app.listen(port, () => {
  console.log(`Agent Éon 5.0 est à l'écoute sur le port ${port}`);
});
