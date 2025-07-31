#!/bin/bash

# Script de configuration et compilation des blocs personnalisés
# Ce script installe les dépendances et compile les assets

set -e

echo "🚀 Configuration des blocs personnalisés WordPress..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "package.json non trouvé. Veuillez exécuter ce script depuis le répertoire du thème."
    exit 1
fi

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

print_status "Vérification de Node.js: $(node --version)"
print_status "Vérification de npm: $(npm --version)"

# Créer les répertoires nécessaires s'ils n'existent pas
print_status "Création des répertoires nécessaires..."

directories=(
    "assets/dist/js/blocks"
    "assets/dist/css/blocks"
    "assets/scss/blocks"
    "assets/js/blocks"
    "blocks"
)

for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        print_success "Répertoire créé: $dir"
    fi
done

# Installation des dépendances npm
print_status "Installation des dépendances npm..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dépendances npm installées avec succès"
else
    print_error "Échec de l'installation des dépendances npm"
    exit 1
fi

# Vérifier si Composer est installé
if command -v composer &> /dev/null; then
    print_status "Installation des dépendances Composer..."
    composer install --no-dev --optimize-autoloader
    
    if [ $? -eq 0 ]; then
        print_success "Dépendances Composer installées avec succès"
    else
        print_warning "Échec de l'installation des dépendances Composer"
    fi
else
    print_warning "Composer n'est pas installé. Les dépendances PHP ne seront pas installées."
fi

# Compilation des assets
print_status "Compilation des assets..."

# Compiler en mode développement d'abord pour vérifier les erreurs
npm run build

if [ $? -eq 0 ]; then
    print_success "Assets compilés avec succès"
else
    print_error "Échec de la compilation des assets"
    exit 1
fi

# Vérifier si les fichiers compilés existent
compiled_files=(
    "assets/dist/js/blocks-frontend.js"
    "assets/dist/js/blocks-editor.js"
    "assets/dist/css/blocks-frontend.css"
    "assets/dist/css/blocks-editor.css"
)

for file in "${compiled_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "Fichier compilé: $file"
    else
        print_warning "Fichier manquant: $file"
    fi
done

# Vérifier les blocs spécifiques
if [ -f "assets/dist/js/blocks/hero-section.js" ]; then
    print_success "Bloc Hero Section compilé: assets/dist/js/blocks/hero-section.js"
fi

if [ -f "assets/dist/css/blocks/hero-section.css" ]; then
    print_success "Styles Hero Section compilés: assets/dist/css/blocks/hero-section.css"
fi

# Créer un fichier .htaccess pour les assets si nécessaire
if [ ! -f "assets/.htaccess" ]; then
    print_status "Création du fichier .htaccess pour les assets..."
    cat > assets/.htaccess << 'EOF'
# Cache des assets pour 1 an
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Compression gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
EOF
    print_success "Fichier .htaccess créé pour optimiser les performances"
fi

# Créer un fichier de documentation rapide
print_status "Création de la documentation..."
cat > BLOCKS_README.md << 'EOF'
# Blocs Personnalisés WordPress

## Structure des blocs

Chaque bloc doit avoir cette structure dans le dossier `blocks/`:

```
blocks/
├── nom-du-bloc/
    ├── block.json          # Configuration du bloc
    ├── nom-du-bloc.twig    # Template Twig
    ├── fields.php          # Champs ACF
    └── (optionnel)
```

## Assets des blocs

Les assets sont automatiquement découverts et compilés:

- `assets/js/blocks/nom-du-bloc.js` → `assets/dist/js/blocks/nom-du-bloc.js`
- `assets/scss/blocks/nom-du-bloc.scss` → `assets/dist/css/blocks/nom-du-bloc.css`

## Commandes utiles

```bash
# Développement avec watch
npm run dev

# Compilation pour production
npm run build

# Compilation SCSS uniquement
npm run scss:build
```

## Exemple de bloc

Voir le bloc `hero-section` comme exemple complet.

## Variables CSS disponibles

```css
:root {
  --block-spacing: 2rem;
  --block-padding: 1.5rem;
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... */
}
```
EOF

print_success "Documentation créée: BLOCKS_README.md"

# Résumé final
echo ""
echo "=================================="
print_success "Configuration terminée avec succès!"
echo "=================================="
echo ""
print_status "Que faire maintenant:"
echo "  1. Activez ACF Pro dans WordPress"
echo "  2. Activez le thème custom-theme"
echo "  3. Créez une nouvelle page et ajoutez le bloc 'Section Hero'"
echo "  4. Pour le développement, utilisez: ${BLUE}npm run dev${NC}"
echo "  5. Pour la production, utilisez: ${BLUE}npm run build${NC}"
echo ""
print_status "Fichiers importants créés:"
echo "  - Bloc exemple: blocks/hero-section/"
echo "  - Assets compilés: assets/dist/"
echo "  - Documentation: BLOCKS_README.md"
echo ""
print_warning "N'oubliez pas d'installer et d'activer ACF Pro pour que les blocs fonctionnent!"
echo ""
