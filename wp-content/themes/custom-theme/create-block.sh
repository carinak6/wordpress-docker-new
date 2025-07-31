#!/bin/bash

# Script pour créer un nouveau bloc Gutenberg avec assets
# Usage: ./create-block.sh nom-du-bloc "Titre du Bloc"

if [ -z "$1" ]; then
    echo "Usage: $0 <nom-du-bloc> [\"Titre du Bloc\"]"
    echo "Exemple: $0 testimonial \"Témoignage\""
    exit 1
fi

BLOCK_NAME=$1
BLOCK_TITLE=${2:-$(echo $1 | sed 's/-/ /g' | sed 's/\b\w/\U&/g')}
BLOCK_DIR="blocks/$BLOCK_NAME"

# Créer le dossier du bloc
mkdir -p "$BLOCK_DIR"

echo "📁 Création du bloc '$BLOCK_NAME' dans $BLOCK_DIR..."

# Créer block.json
cat > "$BLOCK_DIR/block.json" << EOF
{
  "name": "$BLOCK_NAME",
  "title": "$BLOCK_TITLE",
  "description": "Bloc personnalisé $BLOCK_TITLE",
  "category": "custom-blocks",
  "icon": "format-image",
  "keywords": ["$BLOCK_NAME", "custom"],
  "supports": {
    "align": ["left", "center", "right", "wide", "full"],
    "anchor": true,
    "customClassName": true,
    "spacing": {
      "margin": true,
      "padding": true
    }
  }
}
EOF

# Créer fields.php
cat > "$BLOCK_DIR/fields.php" << EOF
<?php
acf_add_local_field_group(array(
    'key' => 'group_$BLOCK_NAME',
    'title' => '$BLOCK_TITLE',
    'fields' => array(
        array(
            'key' => 'field_${BLOCK_NAME}_title',
            'label' => 'Titre',
            'name' => 'title',
            'type' => 'text',
            'required' => true,
            'default_value' => 'Titre du $BLOCK_TITLE',
        ),
        array(
            'key' => 'field_${BLOCK_NAME}_content',
            'label' => 'Contenu',
            'name' => 'content',
            'type' => 'textarea',
            'rows' => 4,
        ),
    ),
    'location' => array(
        array(
            array(
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/$BLOCK_NAME',
            ),
        ),
    ),
));
EOF

# Créer le template Twig
cat > "$BLOCK_DIR/$BLOCK_NAME.twig" << EOF
<div class="{{ block.classes }}">
    {% if fields.title %}
        <h2 class="${BLOCK_NAME}__title">{{ fields.title }}</h2>
    {% endif %}
    
    {% if fields.content %}
        <div class="${BLOCK_NAME}__content">
            {{ fields.content|nl2br }}
        </div>
    {% endif %}
</div>
EOF

# Créer le fichier SCSS
cat > "$BLOCK_DIR/$BLOCK_NAME.scss" << EOF
// Styles pour le bloc $BLOCK_TITLE
.block-$BLOCK_NAME {
  margin-bottom: var(--block-spacing, 2rem);
  padding: var(--block-padding, 1.5rem);
  
  &__title {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color, #667eea);
  }
  
  &__content {
    color: #4a5568;
    line-height: 1.6;
    
    p {
      margin: 0 0 1rem 0;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  // Responsive
  @media (max-width: 768px) {
    padding: 1rem;
    
    &__title {
      font-size: 1.25rem;
    }
  }
}
EOF

# Créer le fichier JavaScript
BLOCK_NAME_CAMEL=$(echo $BLOCK_NAME | sed 's/-\([a-z]\)/\U\1/g' | sed 's/^\([a-z]\)/\U\1/')

cat > "$BLOCK_DIR/$BLOCK_NAME.js" << EOF
/**
 * JavaScript pour le bloc $BLOCK_TITLE
 */

class ${BLOCK_NAME_CAMEL}Block {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Initialiser les animations d'entrée
    this.initAnimations();
    
    console.log('Bloc $BLOCK_TITLE initialisé');
  }

  /**
   * Initialise les animations d'entrée avec Intersection Observer
   */
  initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('${BLOCK_NAME}--animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.element);
  }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.block-$BLOCK_NAME');
  blocks.forEach(block => new ${BLOCK_NAME_CAMEL}Block(block));
});

// CSS pour les animations
const style = document.createElement('style');
style.textContent = \`
  .block-$BLOCK_NAME {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .block-$BLOCK_NAME.${BLOCK_NAME}--animate-in {
    opacity: 1;
    transform: translateY(0);
  }
\`;
document.head.appendChild(style);
EOF

echo "✅ Bloc '$BLOCK_NAME' créé avec succès !"
echo ""
echo "📋 Fichiers créés :"
echo "   - $BLOCK_DIR/block.json"
echo "   - $BLOCK_DIR/fields.php"
echo "   - $BLOCK_DIR/$BLOCK_NAME.twig"
echo "   - $BLOCK_DIR/$BLOCK_NAME.scss"
echo "   - $BLOCK_DIR/$BLOCK_NAME.js"
echo ""
echo "🔨 Prochaines étapes :"
echo "   1. Personnaliser les champs ACF dans fields.php"
echo "   2. Modifier le template Twig selon vos besoins"
echo "   3. Ajuster les styles SCSS"
echo "   4. Compiler les assets : npm run build"
echo "   5. Le bloc apparaîtra automatiquement dans Gutenberg !"
EOF
