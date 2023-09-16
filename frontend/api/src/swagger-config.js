const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'API de Suivi Patient',
            version: '1.0.0',
            description: 'Une API pour la gestion des suivis patients',
        },
        basePath: '/',
    },
    apis: ['./server.js'], // Spécifiez le chemin vers votre fichier de serveur (server.js)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



