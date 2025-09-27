FROM node:18-alpine as build

WORKDIR /app

# Copier package.json
COPY package.json .



# Supprimer node_modules s'il existe et réinstaller complètement
RUN npm install


# Copier le code source
COPY . .

# Vérifier l'installation de Vite
RUN ls -la node_modules/vite/dist/node/chunks/ || echo "Vite chunks directory not found"

# Donner les permissions d'exécution
RUN chmod +x node_modules/.bin/*

# Build l'application
RUN npm run build

# Stage de production avec Nginx
FROM nginx:alpine

# Supprimer la configuration par défaut
RUN rm -rf /etc/nginx/conf.d/*

# Copier les fichiers buildés
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
