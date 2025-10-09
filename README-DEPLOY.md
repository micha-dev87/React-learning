# 📦 Configuration Docker pour le Portfolio

Ce dossier contient la configuration Docker pour déployer le portfolio React sur un VPS Ubuntu.

## 🏗️ Architecture

Le portfolio fait partie d'une **infrastructure Docker multi-services** gérée par un `docker-compose.yml` parent qui inclut :

- **Portfolio** (ce projet) - Application React
- **Caddy** - Reverse proxy avec HTTPS automatique
- **n8n** - Automatisation des workflows
- **Flowise** - Gestion des flux
- **Langfuse** - Observabilité LLM
- **Supabase** - Base de données
- **Et autres services...**

## 🚀 Déploiement rapide

### Sur votre VPS Ubuntu

```bash
# 1. Cloner le projet (ou pull les changements)
cd /path/to/react-portfolio
git pull

# 2. Build et déployer
chmod +x deploy.sh
./deploy.sh
```

### Rebuild complet (après modification du Dockerfile ou nginx.conf)

```bash
chmod +x rebuild.sh
./rebuild.sh
```

## 📁 Fichiers importants

- `Dockerfile` - Configuration de l'image Docker avec Nginx
- `nginx.conf` - Configuration Nginx optimisée pour SPA React
- `.dockerignore` - Fichiers à exclure du build Docker
- `deploy.sh` - Script de déploiement rapide (mise à jour du code uniquement)
- `rebuild.sh` - Script de rebuild complet (reconstruction de l'image Docker)
- `DEPLOYMENT.md` - Guide complet de déploiement (installation Docker, configuration domaine, etc.)

## 🔧 Commandes utiles

**Note** : Les commandes `docker-compose` doivent être exécutées depuis le **dossier parent**

```bash
# Voir les logs
cd .. && docker-compose logs -f portfolio

# Redémarrer
cd .. && docker-compose restart portfolio

# Rebuild
cd .. && docker-compose build --no-cache portfolio && docker-compose up -d portfolio
```

## 🌐 Configuration du domaine

1. Pointer votre domaine/sous-domaine vers l'IP du VPS (DNS A record)
2. Modifier le fichier `.env` du dossier parent :
   ```
   PORTFOLIO_HOSTNAME=portfolio.votredomaine.com
   LETSENCRYPT_EMAIL=votre-email@example.com
   ```
3. Redémarrer Caddy : `docker-compose restart caddy`

Caddy gère automatiquement les certificats SSL via Let's Encrypt ! 🔒

## 📚 Documentation complète

Voir le fichier [`DEPLOYMENT.md`](./DEPLOYMENT.md) pour :
- Installation de Docker sur Ubuntu
- Configuration complète du domaine
- Monitoring et dépannage
- Sécurité et sauvegardes
- Et bien plus...

## 🔄 Workflow de mise à jour

```bash
# Local
git add .
git commit -m "Mise à jour"
git push

# VPS
git pull
./deploy.sh
```

## ⚡ Scripts disponibles

| Script | Utilisation | Quand l'utiliser |
|--------|-------------|------------------|
| `deploy.sh` | Déploiement rapide | Après modification du code React |
| `rebuild.sh` | Rebuild complet | Après modification du Dockerfile/nginx.conf |

## 🆘 Dépannage

```bash
# Voir les logs
cd .. && docker-compose logs --tail=100 portfolio

# Vérifier le statut
cd .. && docker-compose ps portfolio

# Redémarrer si problème
cd .. && docker-compose restart portfolio

# Rebuild si nécessaire
cd .. && docker-compose build --no-cache portfolio
cd .. && docker-compose up -d portfolio
```

## ✨ Optimisations incluses

- ✅ Compression Gzip
- ✅ Cache des assets statiques (1 an)
- ✅ Headers de sécurité (HSTS, X-Frame-Options, etc.)
- ✅ Support SPA (toutes les routes → index.html)
- ✅ Health check endpoint (`/health`)
- ✅ Protection des fichiers sensibles
- ✅ Logs structurés

---

Pour toute question, voir la documentation complète dans [`DEPLOYMENT.md`](./DEPLOYMENT.md)

