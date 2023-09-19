const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Simulons une base de données pour stocker les suivis des patients
const patientSuivis = [];


// Endpoint pour créer un suivi patient
/**
 * @swagger
 * /suivi:
 *   post:
 *     summary: Créer un suivi patient
 *     description: Crée un suivi patient, y compris les informations sur le patient lui-même et les détails de l'intervention.
 *     parameters:
 *       - in: body
 *         name: suiviData
 *         description: Données du suivi patient
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             dateIntervention:
 *               type: string
 *               format: date
 *             nom:
 *               type: string
 *             prenom:
 *               type: string
 *             sexe:
 *               type: string
 *             typeIntervention:
 *               type: string
 *               enum:
 *                 - Prothèse de genou
 *                 - Prothèse de hanche
 *                 - Ligament croisé Antérieur
 *           required:
 *             - email
 *             - dateIntervention
 *             - nom
 *             - prenom
 *             - sexe
 *             - typeIntervention
 *     responses:
 *       201:
 *         description: Suivi patient créé avec succès
 *       400:
 *         description: Erreur de validation
 */

app.post('/suivi', (req, res) => {
    const { email, dateIntervention, nom, prenom, sexe, typeIntervention } = req.body;

    // Valider les champs obligatoires
    if (!email || !dateIntervention || !nom || !prenom || !sexe || !typeIntervention) {
        return res.status(400).json({ message: "Tous les champs obligatoires doivent être renseignés." });
    }

    // Valider le type d'intervention
    const typesValides = ["Prothèse de genou", "Prothèse de hanche", "Ligament croisé Antérieur"];
    if (!typesValides.includes(typeIntervention)) {
        return res.status(400).json({ message: "Le type d'intervention n'est pas valide." });
    }

    // Enregistrer le suivi du patient
    const nouveauSuivi = {
        email,
        dateIntervention,
        nom,
        prenom,
        sexe,
        typeIntervention,
    };
    patientSuivis.push(nouveauSuivi);

    res.status(201).json({ message: "Suivi patient créé avec succès." });
});

// Endpoint pour lister les suivis précédemment créés
/**
 * @swagger
 * /suivis:
 *   get:
 *     summary: Liste des suivis précédemment créés
 *     description: Récupère la liste des suivis précédemment créés.
 *     responses:
 *       200:
 *         description: Succès - Liste des suivis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   dateIntervention:
 *                     type: string
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   sexe:
 *                     type: string
 *                   typeIntervention:
 *                     type: string
 *     500:
 *       description: Erreur serveur
 */
app.get('/suivis', (req, res) => {
    res.status(200).json(patientSuivis);
});

// Endpoint pour annuler un suivi
/**
 * @swagger
 * /suivi/{email}:
 *   delete:
 *     summary: Annuler un suivi
 *     description: Annule un suivi tant que la date d'intervention n'est pas encore passée.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email du patient pour le suivi à annuler
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Suivi annulé avec succès
 *       400:
 *         description: La date d'intervention est déjà passée ou suivi introuvable
 *       500:
 *         description: Erreur serveur
 */
app.delete('/suivi/:email', (req, res) => {
    const { email } = req.params;

    // Trouver le suivi du patient par son email
    const suiviIndex = patientSuivis.findIndex((suivi) => suivi.email === email);

    if (suiviIndex === -1) {
        return res.status(404).json({ message: "Suivi introuvable." });
    }

    // Vérifier si la date d'intervention est passée
    const today = new Date();
    const dateIntervention = new Date(patientSuivis[suiviIndex].dateIntervention);

    if (dateIntervention < today) {
        return res.status(400).json({ message: "La date d'intervention est déjà passée. Vous ne pouvez pas annuler ce suivi." });
    }

    // Supprimer le suivi
    patientSuivis.splice(suiviIndex, 1);

    res.status(200).json({ message: "Suivi annulé avec succès." });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
