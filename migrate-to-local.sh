#!/bin/bash

# Arrêter les conteneurs
docker-compose down

# Créer le dossier wordpress_files s'il n'existe pas
mkdir -p wordpress_files

# Copier les fichiers du conteneur vers le dossier local
echo "Copie des fichiers WordPress..."
docker run --rm --volumes-from wordpress_site -v $(pwd)/wordpress_files:/backup wordpress:latest cp -r /var/www/html/. /backup/

# Ajuster les permissions
echo "Ajustement des permissions..."
sudo chown -R $USER:$USER wordpress_files/
find wordpress_files/ -type d -exec chmod 755 {} \;
find wordpress_files/ -type f -exec chmod 644 {} \;

# Redémarrer les conteneurs
docker-compose up -d

echo "Migration terminée ! Les fichiers WordPress sont maintenant dans le dossier wordpress_files/"
