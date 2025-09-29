FROM nginx:alpine

# Supprimer la configuration par défaut
RUN rm -rf /etc/nginx/conf.d/*

# Copier les fichiers déjà buildés localement
COPY dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
