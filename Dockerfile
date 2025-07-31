FROM wordpress:latest

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    git \
    unzip \
    curl \
    zip \
    && rm -rf /var/lib/apt/lists/*

# Installation de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installation des outils de développement
RUN npm install -g sass
