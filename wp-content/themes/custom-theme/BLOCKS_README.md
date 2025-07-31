# Système de Blocs Gutenberg Personnalisés - WordPress Docker

## 🚀 Statut du Projet

✅ **FONCTIONNEL** - Environnement de développement WordPress prêt avec :
- WordPress 6.8.1 + Docker
- ACF Pro activé
- Timber (templates Twig)
- Système de blocs automatisé
- Webpack + SCSS + JS moderne
- Bloc Hero Section opérationnel

## 📁 Structure des Blocs

Chaque bloc doit avoir cette structure dans le dossier `blocks/`:

```
blocks/
├── nom-du-bloc/
    ├── block.json          # Configuration du bloc (requis)
    ├── nom-du-bloc.twig    # Template Twig (requis)
    ├── fields.php          # Champs ACF (requis)
    └── styles/assets optionnels
```

### Exemple : Bloc Hero Section

```
blocks/hero-section/
├── block.json
├── hero-section.twig
└── fields.php
```

## 🎨 Assets et Compilation

### Structure des Assets

```
assets/
├── js/
│   ├── theme.js                    # JS principal du thème
│   ├── blocks-frontend.js          # JS commun pour tous les blocs
│   ├── blocks-editor.js            # JS pour l'éditeur Gutenberg
│   └── blocks/
│       └── hero-section.js         # JS spécifique au bloc
├── scss/
│   ├── theme.scss                  # Styles principaux
│   ├── blocks-frontend.scss        # Styles communs pour les blocs
│   ├── blocks-editor.scss          # Styles pour l'éditeur
│   └── blocks/
│       └── hero-section.scss       # Styles spécifiques au bloc
└── dist/                           # Fichiers compilés (généré automatiquement)
    ├── js/
    └── css/
```

### Compilation Automatique

Les assets sont automatiquement découverts et compilés via Webpack :

- `assets/js/blocks/nom-du-bloc.js` → `assets/dist/js/blocks/nom-du-bloc.js`
- `assets/scss/blocks/nom-du-bloc.scss` → `assets/dist/css/blocks/nom-du-bloc.css`

## 🛠️ Commandes de Développement

```bash
# Installation des dépendances
cd /home/hp/wordpress-docker-new/wp-content/themes/custom-theme
npm install

# Développement avec watch (recommandé)
npm run dev

# Compilation pour production
npm run build

# Compilation SCSS uniquement
npm run scss:build

# Nettoyage du dossier dist
npm run clean
```

## 🔧 Fonctionnalités du Système

### Auto-découverte des Blocs
- Le système scanne automatiquement le dossier `blocks/`
- Enregistre tous les blocs trouvés avec ACF
- Charge automatiquement les champs et templates

### Templates Timber/Twig
- Utilisation de Twig pour les templates de blocs
- Context enrichi avec les champs ACF
- Support des classes CSS automatiques

### Assets Intelligents
- Enqueue automatique des JS/CSS spécifiques aux blocs
- Dépendances gérées automatiquement
- Compilation optimisée avec Webpack

## 📝 Création d'un Nouveau Bloc

### 1. Créer la structure

```bash
mkdir blocks/mon-nouveau-bloc
cd blocks/mon-nouveau-bloc
```

### 2. Créer `block.json`

```json
{
  "name": "mon-nouveau-bloc",
  "title": "Mon Nouveau Bloc",
  "description": "Description de mon bloc",
  "category": "custom-blocks",
  "icon": "format-image",
  "keywords": ["custom", "mon-bloc"],
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "customClassName": true
  }
}
```

### 3. Créer `fields.php`

```php
<?php
acf_add_local_field_group(array(
    'key' => 'group_mon_nouveau_bloc',
    'title' => 'Mon Nouveau Bloc',
    'fields' => array(
        array(
            'key' => 'field_mon_titre',
            'label' => 'Titre',
            'name' => 'titre',
            'type' => 'text',
            'required' => true,
        ),
    ),
    'location' => array(
        array(
            array(
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/mon-nouveau-bloc',
            ),
        ),
    ),
));
```

### 4. Créer `mon-nouveau-bloc.twig`

```twig
<div class="{{ block.classes }}">
    <h2>{{ fields.titre }}</h2>
</div>
```

### 5. Créer les assets (optionnel)

```bash
# JS spécifique au bloc
touch assets/js/blocks/mon-nouveau-bloc.js

# SCSS spécifique au bloc
touch assets/scss/blocks/mon-nouveau-bloc.scss
```

### 6. Compiler et tester

```bash
npm run build
```

Le bloc apparaîtra automatiquement dans l'éditeur Gutenberg !

## 🐛 Debug et Vérification

### Fonction de Debug
Accédez à `http://localhost:8080/?debug_blocks=1` (en tant qu'admin) pour voir :
- Liste des blocs ACF enregistrés
- Contenu du dossier `blocks/`
- État du système

### Logs PHP
```bash
# Voir les logs WordPress
docker-compose logs wordpress

# Logs en temps réel
docker-compose logs -f wordpress
```

## 🌟 Bloc Hero Section (Exemple Complet)

Le bloc `hero-section` inclut :
- **Champs ACF** : titre, sous-titre, texte du bouton, lien, image de fond
- **Template Twig** responsive avec structure flexible
- **Styles SCSS** avec variables CSS et responsive design
- **JavaScript** pour interactions avancées
- **Support** : alignements, ancres, classes personnalisées

### Utilisation du Bloc Hero

1. Créer/éditer une page dans WordPress
2. Ajouter un bloc → Blocs Personnalisés → Section Hero
3. Remplir les champs ACF
4. Publier la page

## 🚀 Environnement de Production

### Variables CSS Disponibles

```css
:root {
  /* Espacement */
  --block-spacing: 2rem;
  --block-padding: 1.5rem;
  
  /* Couleurs */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  
  /* Typographie */
  --heading-font: 'Inter', sans-serif;
  --body-font: 'Inter', sans-serif;
  
  /* Responsive */
  --container-max-width: 1200px;
}
```

### Optimisations Incluses

- **Minification** JS/CSS en production
- **Source maps** pour le développement
- **Tree shaking** pour éliminer le code inutilisé
- **Cache busting** avec hashes de fichiers
- **Lazy loading** des assets de blocs

## 📚 Ressources et Support

- **Documentation Timber** : https://timber.github.io/docs/
- **Documentation ACF** : https://www.advancedcustomfields.com/resources/
- **Gutenberg Handbook** : https://developer.wordpress.org/block-editor/

## 🔄 Prochaines Étapes Suggérées

1. **Créer d'autres blocs** (cards, testimonials, gallery)
2. **Ajouter des animations CSS/JS**
3. **Configurer un système de mise en cache**
4. **Intégrer des tests automatisés**
5. **Optimiser les performances**

---

**Statut :** ✅ Prêt pour le développement
**Dernière mise à jour :** 31 juillet 2025
