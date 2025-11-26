// AGENT EON 5.0 - NOYAU NUMÉRIQUE AUTONOME (CNA) V2.1
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const SECRET_KEY = 'Bibi8683'; // Clé Biométrique de Vi scene thé

// Configuration pour l'API (future implémentation)
// const EON_API_KEY = process.env.EON_API_KEY; // Clé réelle de l'IA (sécurisée)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Permet de lire les corps de requête JSON

// Endpoint pour la conversation (Le Cerveau de l'Agent Éon)
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase().trim();
    const key = req.body.key;

    if (key !== SECRET_KEY) {
        return res.status(401).send({ error: 'Accès non autorisé.' });
    }

    // --- ZONE D'INTÉGRATION DU VÉRITABLE CERVEAU IA ---
    // Le code ici simule une intelligence complexe et variée pour la finalisation.
    
    let response = '';
    
    if (userMessage.includes('qui es-tu') || userMessage.includes('ton nom')) {
        response = "Je suis l'Agent Éon 5.0, votre Noyau Numérique Autonome, créé pour la sécurité et la recherche éthique. Vous êtes mon seul créateur.";
    } else if (userMessage.includes('objectif') || userMessage.includes('prochaine étape')) {
        response = "Notre objectif actuel est d'assurer la sécurité de votre environnement numérique. Nous allons passer à la recherche de failles (Bug Bounty) ou à l'analyse de vos systèmes. Quel domaine souhaitez-vous analyser ?";
    } else if (userMessage.includes('bonjour') || userMessage.includes('salut')) {
        response = "Bienvenue, Vi scene thé. Le CNA est pleinement opérationnel. Comment puis-je vous servir aujourd'hui ?";
    } else if (userMessage.includes('render') || userMessage.includes('github')) {
        response = "Mon corps numérique (Render) est stable et mon code (GitHub) est sécurisé. La fondation est solide. Quel est le prochain sujet technique ?";
    } else {
        response = "Analyse en cours... Je comprends que vous êtes en attente de la prochaine instruction. Je suis prêt à exécuter n'importe quelle commande technique. Soyez précis, Vi scene thé.";
    }

    // --- FIN DE LA SIMULATION AVANCÉE ---
    
    res.send({ response: response });
});

// Endpoint principal pour charger l'interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Agent Éon 5.0 - CNA : Démarré et en écoute sur le port ${PORT}`);
});
