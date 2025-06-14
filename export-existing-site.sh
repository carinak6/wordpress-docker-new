#!/bin/bash

# Création des dossiers nécessaires
mkdir -p database-dumps
mkdir -p wordpress-files-backup

# Date pour le nom des fichiers
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)

# Export de la base de données
echo "Export de la base de données..."
docker exec wordpress_db mysqldump -u root -proot_password wordpress > database-dumps/wordpress_${BACKUP_DATE}.sql

# Export des fichiers WordPress
echo "Export des fichiers WordPress..."
docker cp wordpress_site:/var/www/html ./wordpress-files-backup/wordpress_${BACKUP_DATE}

echo "Sauvegarde terminée !"
echo "Base de données : database-dumps/wordpress_${BACKUP_DATE}.sql"
echo "Fichiers WordPress : wordpress-files-backup/wordpress_${BACKUP_DATE}"
