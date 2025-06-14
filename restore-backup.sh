#!/bin/bash

echo "🔄 Restauration de la base de données WordPress..."

# Vérifier si un fichier de sauvegarde a été spécifié
if [ -z "$1" ]; then
    echo "❌ Erreur : Veuillez spécifier un fichier de sauvegarde à restaurer."
    echo "Usage : ./restore-backup.sh database-dumps/wordpress_YYYYMMDD_HHMMSS.sql"
    exit 1
fi

# Vérifier si le fichier existe
if [ ! -f "$1" ]; then
    echo "❌ Erreur : Le fichier de sauvegarde $1 n'existe pas."
    exit 1
fi

# Arrêter les conteneurs
echo "⏸️  Arrêt des conteneurs..."
docker-compose down

# Démarrer uniquement le conteneur de la base de données
echo "▶️  Démarrage du conteneur de la base de données..."
docker-compose up -d db

# Attendre que la base de données soit prête
echo "⏳ Attente de la disponibilité de la base de données..."
sleep 10

# Restaurer la sauvegarde
echo "📥 Restauration de la sauvegarde $1..."
docker exec -i wordpress_db mysql -u root -proot_password wordpress < "$1"

# Redémarrer tous les conteneurs
echo "🔄 Redémarrage de tous les conteneurs..."
docker-compose up -d

echo "✅ Restauration terminée avec succès !"
