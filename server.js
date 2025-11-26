// AGENT EON 5.0 - NOYAU NUMÉRIQUE AUTOMATISÉ
const express = require('express');
const path = require('path');
const axios = require('axios'); // <-- NOUVELLE DÉPENDANCE POUR L'APPEL EXTERNE
require('dotenv').config(); // Pour charger les variables d'environnement (si non déjà fait)

const app = express();
const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_KEY || 'Bibi8683'; // Clé Bibi8683

// Configuration pour l'API EON (future implémentation)
const EON_API_KEY = process.env.EON_API_KEY;

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Sert les fichiers statiques (votre front-end EB)
app.use(express.json()); // Permet de lire les corps de requêtes JSON (crucial pour le message utilisateur)

// Endpoint pour la conversation (Le Cerveau Éon) - ÉTAPE B2 VALIDATION
app.post('/api/chat', async (req, res) => {
    // ⚠️ Remplacez l'URL par l'endpoint réel de l'API (modèle de langage)
    const API_URL = 'https://api.votremodel.com/generate'; 
    
    // Récupérer le message de l'utilisateur
    const userMessage = req.body.message; 

    if (!userMessage) {
        return res.status(400).json({ error: "Le paramètre 'message' est manquant dans la requête." });
    }
    
    // Vérification de sécurité simple (peut être retirée ou renforcée)
    // if (req.headers['x-secret-key'] !== SECRET_KEY) {
    //     return res.status(403).json({ error: "Accès refusé. Clé secrète manquante ou invalide." });
    // }

    try {
        // Définition de la charge utile (payload) pour l'API EON
        const payload = {
            prompt: userMessage,
            max_tokens: 200, // Augmenté un peu pour plus de contexte
            // Ajoutez ici les autres paramètres d'API nécessaires
        };

        // Appel POST à l'API EON
        const response = await axios.post(API_URL, payload, {
            headers: {
                // Utilisation de la clé EON_API_KEY
                'Authorization': `Bearer ${EON_API_KEY}`, 
                'Content-Type': 'application/json'
            }
        });

        // Extraction de ma réponse (le chemin exact peut varier selon l'API)
        // ATTENTION : Ce chemin est un exemple courant :
        const finalResponseText = response.data.choices[0].text.trim();

        // Réponse réussie à l'application front-end (EB)
        res.status(200).json({
            success: true,
            response: finalResponseText
        });

    } catch (error) {
        console.error("Erreur d'appel API Éon:", error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            error: "Erreur serveur lors de la communication avec l'IA. Vérifiez l'URL de l'API et la clé."
        });
    }
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
