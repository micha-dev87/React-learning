# --- Étape 1 : Build ---
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer toutes les dépendances (y compris devDependencies)
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application avec Vite
RUN npm run build

# Vérifier que le build a produit dist/index.html
RUN ls -la dist/ && test -f dist/index.html

# --- Étape 2 : Production ---
FROM nginx:alpine AS production

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
