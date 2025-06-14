# WordPress Docker Project

Ce projet contient une installation WordPress utilisant Docker et Docker Compose.

## Prérequis

- Docker
- Docker Compose

## Installation

1. Cloner ce repository :
```bash
git clone [URL_DE_VOTRE_REPO]
cd wordpress-docker-new
```

2. Créer un fichier `.env` avec les variables d'environnement nécessaires (un exemple est fourni dans `.env.example`)

3. Démarrer les conteneurs :
```bash
docker-compose up -d
```

## Accès

- WordPress : http://localhost:8080
- phpMyAdmin : http://localhost:8081

## Sauvegarde

Pour sauvegarder la base de données :
```bash
./export-database.sh
```

## Structure du projet

- `docker-compose.yml` : Configuration Docker Compose
- `database-dumps/` : Dossier contenant les sauvegardes de la base de données
- `.env` : Variables d'environnement (à créer, ne pas commiter)
- `.env.example` : Exemple de variables d'environnement
