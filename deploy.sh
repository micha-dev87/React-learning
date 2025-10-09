#!/bin/bash

# Script de déploiement pour le portfolio React
# Usage: ./deploy.sh
# Ce script est conçu pour fonctionner avec le docker-compose.yml du dossier parent

set -e

echo "🚀 Début du déploiement du portfolio..."

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier qu'on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json introuvable. Êtes-vous dans le dossier du portfolio ?${NC}"
    exit 1
fi

# 1. Build de l'application React
echo -e "${YELLOW}📦 Build de l'application React...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Erreur: Le dossier dist n'a pas été créé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build terminé avec succès${NC}"

# 2. Redémarrer le conteneur portfolio via le docker-compose parent
echo -e "${YELLOW}🔄 Redémarrage du conteneur portfolio...${NC}"
cd ..
docker-compose restart portfolio

# 3. Vérifier le statut
echo -e "${YELLOW}🔍 Vérification du statut...${NC}"
sleep 3
docker-compose ps portfolio

# 4. Afficher les logs récents
echo -e "${YELLOW}📋 Logs récents du portfolio:${NC}"
docker-compose logs --tail=20 portfolio

echo -e "${GREEN}✨ Déploiement du portfolio terminé!${NC}"
echo -e "${YELLOW}💡 Accédez à votre portfolio via l'URL configurée dans PORTFOLIO_HOSTNAME${NC}"

