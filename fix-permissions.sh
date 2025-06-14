#!/bin/bash

echo "🔧 Correction des permissions WordPress..."

# Arrêter les conteneurs
docker-compose down

# Créer les dossiers nécessaires s'ils n'existent pas
mkdir -p wordpress_files

# Définir l'utilisateur WordPress (www-data dans le conteneur = 33:33)
WP_USER=33
WP_GROUP=33

# Ajuster les permissions des fichiers WordPress
echo "Ajustement des permissions des fichiers..."
sudo chown -R $USER:$USER wordpress_files/
sudo find wordpress_files/ -type d -exec chmod 755 {} \;
sudo find wordpress_files/ -type f -exec chmod 644 {} \;

# Ajuster les permissions spécifiques pour wp-content
if [ -d "wordpress_files/wp-content" ]; then
    echo "Ajustement des permissions wp-content..."
    sudo chown -R $WP_USER:$WP_GROUP wordpress_files/wp-content
    sudo find wordpress_files/wp-content -type d -exec chmod 755 {} \;
    sudo find wordpress_files/wp-content -type f -exec chmod 644 {} \;
fi

# Redémarrer les conteneurs
docker-compose up -d

echo "✅ Permissions corrigées avec succès !"
