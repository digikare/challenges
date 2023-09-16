# Serveur Node.js pour le Suivi des Patients

Ce serveur Node.js est conçu pour vous donner un `fake` serveur vous permettant de vous concentrer sur la partie `front` et utilisation de l'API.

## Lancement

Utiliser docker compose pour lancer le serveur. Il sera disponible sur le port 3000.
Le serveur est gère les données en `mémoire` à chaques lancement du serveur les données repartent de zéro.

```shell
docker-compose up --build
```

Vous avec le swagger UI sur cet URL : `http://localhost:3000/api-docs`
