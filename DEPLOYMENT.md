# 🚀 Guide de déploiement du Portfolio sur VPS Ubuntu

> ⚠️ **Note importante** : Ce portfolio fait partie d'une infrastructure Docker plus large gérée par un `docker-compose.yml` parent qui inclut également n8n, Flowise, Langfuse, Caddy, etc. Le reverse proxy Caddy gère le routage vers tous les services.

## Prérequis sur le VPS

### 1. Installer Docker

```bash
# Mettre à jour les paquets
sudo apt update && sudo apt upgrade -y

# Installer les dépendances
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Ajouter la clé GPG Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Ajouter le repository Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installer Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Vérifier l'installation
docker --version
```

### 2. Installer Docker Compose

```bash
# Télécharger Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Rendre exécutable
sudo chmod +x /usr/local/bin/docker-compose

# Vérifier l'installation
docker-compose --version
```

### 3. Configurer les permissions Docker (optionnel)

```bash
# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER

# Appliquer les changements
newgrp docker
```

## Structure des fichiers

```
📁 Dossier parent/
├── docker-compose.yml       # ✅ Fichier principal avec tous les services
├── Caddyfile               # Configuration du reverse proxy
├── .env                    # Variables d'environnement
└── 📁 react-portfolio/     # ← Votre dossier portfolio (ce projet)
    ├── Dockerfile
    ├── nginx.conf
    ├── dist/              # Créé après npm run build
    ├── deploy.sh          # Script de déploiement rapide
    ├── rebuild.sh         # Script de rebuild complet
    └── ...
```

## Déploiement

### Méthode 1 : Déploiement rapide (après modifications du code React)

Utilisez `deploy.sh` quand vous modifiez seulement le code React :

```bash
# Dans le dossier du portfolio
chmod +x deploy.sh
./deploy.sh
```

Ce script va :
1. Build l'application React (`npm run build`)
2. Redémarrer le conteneur portfolio

### Méthode 2 : Rebuild complet (après modifications Docker/Nginx)

Utilisez `rebuild.sh` quand vous modifiez le `Dockerfile` ou `nginx.conf` :

```bash
# Dans le dossier du portfolio
chmod +x rebuild.sh
./rebuild.sh
```

Ce script va :
1. Build l'application React
2. Arrêter le conteneur existant
3. Reconstruire l'image Docker (sans cache)
4. Redémarrer le conteneur

### Méthode 3 : Déploiement manuel

```bash
# 1. Dans le dossier du portfolio
npm run build

# 2. Retourner au dossier parent
cd ..

# 3. Redémarrer juste le portfolio
docker-compose restart portfolio

# OU rebuild complet si nécessaire
docker-compose build --no-cache portfolio
docker-compose up -d portfolio
```

## Commandes utiles

### Gestion du conteneur portfolio

**⚠️ Toutes ces commandes doivent être exécutées depuis le dossier parent (où se trouve docker-compose.yml)**

```bash
# Voir les logs du portfolio
docker-compose logs -f portfolio

# Voir les logs récents (dernières 50 lignes)
docker-compose logs --tail=50 portfolio

# Redémarrer uniquement le portfolio
docker-compose restart portfolio

# Arrêter le portfolio
docker-compose stop portfolio

# Démarrer le portfolio
docker-compose start portfolio

# Reconstruire et redémarrer
docker-compose up -d --build portfolio
```

### Monitoring

```bash
# Voir le statut de tous les conteneurs
docker-compose ps

# Voir les statistiques du portfolio
docker stats portfolio

# Vérifier le health check du portfolio
docker inspect portfolio | grep -A 10 Health

# Voir les logs nginx du portfolio
tail -f logs/portfolio/access.log
tail -f logs/portfolio/error.log
```

### Gestion globale (tous les services)

```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Voir les logs de tous les services
docker-compose logs -f

# Redémarrer tous les services
docker-compose restart
```

### Nettoyage

```bash
# Supprimer les images non utilisées
docker image prune -a

# Nettoyer tout le système Docker
docker system prune -a --volumes
```

## Configuration avec un nom de domaine

### 1. Pointer votre domaine vers le VPS

Configurer un enregistrement A dans votre DNS :
```
Type: A
Name: @ (ou portfolio)
Value: [IP de votre VPS]
TTL: 3600
```

### 2. Configurer Caddy pour votre domaine

**Caddy est déjà configuré comme reverse proxy** dans votre infrastructure. Pour activer HTTPS automatique pour votre portfolio :

1. **Modifier le fichier `.env` dans le dossier parent** :

```bash
# Dans le dossier parent
nano .env

# Modifier ou ajouter cette ligne :
PORTFOLIO_HOSTNAME=portfolio.votredomaine.com
LETSENCRYPT_EMAIL=votre-email@example.com
```

2. **Vérifier le Caddyfile** (dans le dossier parent) :

Le Caddyfile devrait contenir une configuration pour le portfolio qui utilise la variable `PORTFOLIO_HOSTNAME`. Caddy gère automatiquement les certificats SSL via Let's Encrypt.

3. **Redémarrer Caddy** pour appliquer les changements :

```bash
# Dans le dossier parent
docker-compose restart caddy
```

Caddy va automatiquement :
- Obtenir un certificat SSL de Let's Encrypt
- Configurer HTTPS
- Gérer le renouvellement automatique des certificats

### 3. Accès au portfolio

Une fois configuré, votre portfolio sera accessible via :
- `https://portfolio.votredomaine.com` (si vous avez configuré un sous-domaine)
- Ou selon l'URL définie dans `PORTFOLIO_HOSTNAME`

**Note** : Caddy gère automatiquement le HTTPS, pas besoin de configuration manuelle de certificats SSL !

## Sécurité

### 1. Configurer le firewall

```bash
# Installer UFW
sudo apt install -y ufw

# Configurer les règles
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Activer le firewall
sudo ufw enable
sudo ufw status
```

### 2. Mettre en place des sauvegardes

```bash
# Créer un script de backup
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$(whoami)/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup de l'image Docker
docker save portfolio-react:latest | gzip > $BACKUP_DIR/portfolio_$DATE.tar.gz

# Garder seulement les 7 derniers backups
ls -t $BACKUP_DIR/portfolio_*.tar.gz | tail -n +8 | xargs rm -f
EOF

chmod +x backup.sh

# Ajouter au crontab pour backup quotidien
(crontab -l 2>/dev/null; echo "0 2 * * * /path/to/backup.sh") | crontab -
```

## Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier que le port 80 n'est pas utilisé
sudo lsof -i :80

# Reconstruire l'image
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Erreur "port déjà utilisé"

```bash
# Trouver et arrêter le processus utilisant le port 80
sudo lsof -ti:80 | xargs sudo kill -9
```

### Mise à jour du code

```bash
# Sur votre machine locale
git add .
git commit -m "Mise à jour du portfolio"
git push

# Sur le VPS
cd /path/to/react-portfolio
git pull
./deploy.sh
```

### Workflow de développement

```bash
# 1. Développer en local
npm run dev

# 2. Tester le build
npm run build

# 3. Commit et push
git add .
git commit -m "Vos modifications"
git push

# 4. Sur le VPS - Pull et déployer
git pull
./deploy.sh
```

## Variables d'environnement (si nécessaire)

Si votre application nécessite des variables d'environnement :

```bash
# Créer un fichier .env
cat > .env << 'EOF'
NODE_ENV=production
API_URL=https://api.votredomaine.com
EOF

# Modifier docker-compose.yml pour inclure :
# env_file:
#   - .env
```

## Support

Pour plus d'informations :
- Documentation Docker : https://docs.docker.com
- Documentation Nginx : https://nginx.org/en/docs/
- Documentation Certbot : https://certbot.eff.org/

