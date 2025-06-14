#!/bin/bash

echo "🚀 Migration des fichiers WordPress vers la racine..."

# Arrêter les conteneurs
docker-compose down

# Faire une sauvegarde des fichiers WordPress actuels
echo "📦 Création d'une sauvegarde..."
timestamp=$(date +%Y%m%d_%H%M%S)
mkdir -p wordpress-files-backup
cp -r wordpress_files wordpress-files-backup/wordpress_$timestamp

# Déplacer les fichiers vers la racine
echo "🔄 Déplacement des fichiers..."
mv wordpress_files/* .

# Nettoyer le dossier vide
rmdir wordpress_files

# Ajuster les permissions
echo "🔧 Ajustement des permissions..."
sudo find . -type d -exec chmod 755 {} \;
sudo find . -type f -exec chmod 644 {} \;

# Redémarrer les conteneurs
docker-compose up -d

echo "✅ Migration terminée ! Une sauvegarde a été créée dans wordpress-files-backup/wordpress_$timestamp"
