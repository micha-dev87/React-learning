# Dockerfile pour React-learning avec Vite
FROM node:18-alpine as build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci

RUN ls -l node_modules/.bin && npm list vite

RUN chmod +x node_modules/.bin/vite


# Copier le code source
COPY . .

# Construire l'application avec Vite
RUN npm run build

# Vérifier que le build s'est bien passé
RUN ls -la dist/ && test -f dist/index.html

# Stage de production avec Nginx
FROM nginx:alpine

# Copier les fichiers construits depuis Vite (dossier dist/)
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
