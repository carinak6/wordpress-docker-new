#!/bin/bash

echo "📦 Export de la base de données WordPress..."

# Création du dossier database-dumps s'il n'existe pas
mkdir -p database-dumps

# Export de la base de données avec options de sécurité
docker exec wordpress_db mysqldump -u root -proot_password --single-transaction --routines --triggers wordpress > database-dumps/wordpress_$(date +%Y%m%d_%H%M%S).sql

echo "✅ Sauvegarde terminée avec succès !"
echo "📁 Liste des sauvegardes disponibles :"
ls -lh database-dumps/
