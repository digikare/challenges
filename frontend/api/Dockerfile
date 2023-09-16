# Utiliser une image de Node.js comme base
FROM node:14

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY src/package.json .
COPY src/package-lock.json .
COPY src/server.js .
COPY src/swagger-config.js .

# Installer les dépendances
RUN npm install

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
