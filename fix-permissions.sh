#!/bin/bash

echo "🔧 Correction des permissions WordPress..."

# Créer les dossiers nécessaires s'ils n'existent pas
mkdir -p wp-content/uploads
mkdir -p wp-content/upgrade
mkdir -p wp-content/plugins
mkdir -p wp-content/themes

# Définir l'utilisateur WordPress (www-data dans le conteneur = 33:33)
WP_USER=33
WP_GROUP=33

# Ajuster les permissions de base
echo "Ajustement des permissions de base..."
sudo find . -type d -exec chmod 755 {} \;
sudo find . -type f -exec chmod 644 {} \;

# Ajuster les permissions spécifiques pour wp-content
echo "Ajustement des permissions wp-content..."
sudo chown -R $WP_USER:$WP_GROUP wp-content
sudo chmod -R 775 wp-content/uploads
sudo chmod -R 775 wp-content/upgrade
sudo chmod -R 775 wp-content/plugins
sudo chmod -R 775 wp-content/themes

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
