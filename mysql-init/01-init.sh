#!/bin/bash
echo "Attente du démarrage de MySQL..."
while ! mysqladmin ping -h"localhost" --silent; do
    sleep 1
done

echo "Importation de la base de données wordpress.sql..."
mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/wordpress.sql
