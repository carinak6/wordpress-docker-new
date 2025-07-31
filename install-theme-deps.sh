#!/bin/bash

# Installation des dépendances système
docker exec -it wordpress_site apt-get update
docker exec -it wordpress_site apt-get install -y \
    curl \
    zip \
    unzip \
    git \
    nodejs \
    npm

# Installation de Composer
docker exec -it wordpress_site bash -c 'curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer'

# Installation des dépendances du thème
docker exec -it wordpress_site bash -c "cd /var/www/html/wp-content/themes/custom-theme && composer install"

# Installation des dépendances npm
docker exec -it wordpress_site bash -c "cd /var/www/html/wp-content/themes/custom-theme && npm install"

# Build des assets
docker exec -it wordpress_site bash -c "cd /var/www/html/wp-content/themes/custom-theme && npm run build:css"
