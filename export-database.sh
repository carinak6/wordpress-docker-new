#!/bin/bash

# Création du dossier database-dumps s'il n'existe pas
mkdir -p database-dumps

# Export de la base de données
docker exec wordpress_db mysqldump -u root -proot_password wordpress > database-dumps/wordpress_$(date +%Y%m%d_%H%M%S).sql

echo "Base de données exportée avec succès dans le dossier database-dumps"
