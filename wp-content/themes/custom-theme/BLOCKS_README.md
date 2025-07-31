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
    ├── block.json              # Configuration du bloc (requis)
    ├── nom-du-bloc.twig        # Template Twig (requis)
    ├── fields.php              # Champs ACF (requis)
    ├── nom-du-bloc.js          # JavaScript du bloc (optionnel)
    └── nom-du-bloc.scss        # Styles SCSS du bloc (optionnel)
```

### ✨ NOUVEAU : Assets dans le dossier du bloc

Les fichiers JavaScript et SCSS peuvent maintenant être placés **directement dans le dossier du bloc**, ce qui permet de garder tous les fichiers liés à un bloc au même endroit.

### Structure recommandée : Bloc Hero Section

```
blocks/hero-section/
├── block.json              # Configuration
├── hero-section.twig       # Template Twig
├── fields.php              # Champs ACF
├── hero-section.js         # JavaScript spécifique
└── hero-section.scss       # Styles spécifiques
```

### Structure recommandée : Bloc Card

```
blocks/card/
├── block.json              # Configuration
├── card.twig               # Template Twig
├── fields.php              # Champs ACF
├── card.js                 # JavaScript spécifique
└── card.scss               # Styles spécifiques
```

## 🎨 Assets et Compilation

### ✨ Structure Simplifiée des Assets

**Nouvelle approche unique :** Tous les assets sont maintenant **uniquement** dans les dossiers des blocs.

#### Structure unique et recommandée
```
blocks/nom-du-bloc/
├── block.json
├── nom-du-bloc.twig
├── fields.php
├── nom-du-bloc.js          # JavaScript du bloc
└── nom-du-bloc.scss        # Styles du bloc
```

### Auto-découverte des Assets

Le système Webpack découvre automatiquement les assets **uniquement** dans les dossiers des blocs :

- `blocks/nom-du-bloc/nom-du-bloc.js` → `assets/dist/js/blocks/nom-du-bloc.js`
- `blocks/nom-du-bloc/nom-du-bloc.scss` → `assets/dist/css/blocks/nom-du-bloc.css`

### Structure des Assets Globaux

```
assets/
├── js/
│   ├── theme.js                    # JS principal du thème
│   ├── blocks-frontend.js          # JS commun pour tous les blocs
│   └── blocks-editor.js            # JS pour l'éditeur Gutenberg
├── scss/
│   ├── theme.scss                  # Styles principaux
│   ├── blocks-frontend.scss        # Styles communs pour les blocs
│   └── blocks-editor.scss          # Styles pour l'éditeur
└── dist/                           # Fichiers compilés (généré automatiquement)
    ├── js/
    └── css/
```

### Compilation Automatique

Les assets sont automatiquement découverts et compilés via Webpack :

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

### 5. Créer les assets (optionnel) - DIRECTEMENT dans le dossier du bloc

```bash
# JavaScript spécifique au bloc
touch mon-nouveau-bloc.js

# SCSS spécifique au bloc
touch mon-nouveau-bloc.scss
```

### 6. Exemple de contenu pour `mon-nouveau-bloc.scss`

```scss
.block-mon-nouveau-bloc {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  
  h2 {
    color: var(--primary-color, #667eea);
    margin: 0;
  }
}
```

### 7. Exemple de contenu pour `mon-nouveau-bloc.js`

```javascript
class MonNouveauBloc {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    console.log('Mon nouveau bloc initialisé');
  }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
  const blocs = document.querySelectorAll('.block-mon-nouveau-bloc');
  blocs.forEach(bloc => new MonNouveauBloc(bloc));
});
```

### 8. Compiler et tester

```bash
npm run build
```

Le bloc apparaîtra automatiquement dans l'éditeur Gutenberg !

## 🚀 Création Automatique de Blocs

### Script `create-block.sh`

Un script Bash est inclus pour créer automatiquement la structure complète d'un nouveau bloc avec tous les fichiers nécessaires.

#### Utilisation

```bash
# Créer un nouveau bloc
./create-block.sh nom-du-bloc "Titre du Bloc"

# Exemples
./create-block.sh gallery "Galerie d'Images"
./create-block.sh testimonial "Témoignage"
./create-block.sh accordion "Accordéon"
```

#### Ce que le script génère automatiquement

- `block.json` - Configuration du bloc
- `fields.php` - Champs ACF de base (titre et contenu)
- `nom-du-bloc.twig` - Template Twig de base
- `nom-du-bloc.scss` - Styles SCSS avec animations
- `nom-du-bloc.js` - JavaScript avec animations et auto-initialisation

#### Exemple d'utilisation complète

```bash
# 1. Créer le bloc
./create-block.sh pricing-table "Tableau de Prix"

# 2. Personnaliser les champs dans blocks/pricing-table/fields.php
# 3. Modifier le template dans blocks/pricing-table/pricing-table.twig
# 4. Ajuster les styles dans blocks/pricing-table/pricing-table.scss
# 5. Compiler
npm run build

# 6. Le bloc apparaît automatiquement dans Gutenberg !
```

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

## 🌟 Blocs Disponibles

### Hero Section (Exemple Complet)

Le bloc `hero-section` inclut :
- **Champs ACF** : titre, sous-titre, texte du bouton, lien, image de fond
- **Template Twig** responsive avec structure flexible
- **Styles SCSS** avec variables CSS et responsive design
- **JavaScript** pour interactions avancées
- **Support** : alignements, ancres, classes personnalisées

### Card (Nouvel Exemple)

Le bloc `card` inclut :
- **Champs ACF** : image, titre, sous-titre, contenu, bouton, style
- **Template Twig** flexible avec conditions
- **Styles SCSS** avec 4 variantes de design
- **JavaScript** avec animations et effets de hover
- **Support** : tous les alignements et personnalisations

#### Utilisation du Bloc Card

1. Créer/éditer une page dans WordPress
2. Ajouter un bloc → Blocs Personnalisés → Carte
3. Remplir les champs ACF
4. Choisir un style de carte
5. Publier la page

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

1. **Créer d'autres blocs** (testimonials, gallery, accordion)
2. **Développer des blocs plus complexes** avec interactions avancées
3. **Ajouter des animations CSS/JS avancées**
4. **Configurer un système de mise en cache**
5. **Intégrer des tests automatisés**
6. **Optimiser les performances**

### ✅ Architecture Simplifiée

Avec la nouvelle structure simplifiée :
- ✅ Tous les assets d'un bloc dans un seul dossier
- ✅ Plus de confusion sur l'emplacement des fichiers
- ✅ Maintenance facilitée
- ✅ Création rapide avec le script `create-block.sh`

---

**Statut :** ✅ Prêt pour le développement avancé
**Architecture :** ✨ Structure unique et simplifiée
**Dernière mise à jour :** 31 juillet 2025
