/**
 * JavaScript pour l'éditeur Gutenberg
 * Améliore l'expérience d'édition des blocs personnalisés
 */

import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Fonction pour améliorer les blocs ACF dans l'éditeur
const enhanceACFBlocks = () => {
  // Ajouter des styles personnalisés pour l'aperçu des blocs
  const addBlockPreviewStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .acf-block-preview {
        border: 2px dashed #ccc;
        padding: 20px;
        text-align: center;
        background: #f9f9f9;
        margin: 10px 0;
      }
      
      .acf-block-preview.has-background {
        background-size: cover;
        background-position: center;
      }
      
      .acf-block-preview .block-preview-label {
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 12px;
        display: inline-block;
        margin-bottom: 10px;
      }
    `;
    document.head.appendChild(style);
  };

  // Améliorer l'affichage des blocs vides
  const enhanceEmptyBlocks = () => {
    // Observer les changements dans l'éditeur
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const acfBlocks = node.querySelectorAll ? node.querySelectorAll('[data-type^="acf/"]') : [];
            acfBlocks.forEach(enhanceACFBlock);
          }
        });
      });
    });

    // Observer l'éditeur
    const editor = document.querySelector('.block-editor');
    if (editor) {
      observer.observe(editor, { childList: true, subtree: true });
    }
  };

  // Améliorer un bloc ACF spécifique
  const enhanceACFBlock = (blockElement) => {
    if (blockElement.dataset.enhanced) return;
    blockElement.dataset.enhanced = 'true';

    // Ajouter un indicateur visuel pour les blocs vides
    const blockContent = blockElement.querySelector('.acf-block-body');
    if (blockContent && !blockContent.textContent.trim()) {
      blockContent.classList.add('acf-block-preview');
      
      const blockType = blockElement.dataset.type.replace('acf/', '');
      const label = document.createElement('div');
      label.className = 'block-preview-label';
      label.textContent = `Bloc ${blockType} - Cliquez pour configurer`;
      blockContent.prepend(label);
    }
  };

  // Initialiser les améliorations
  addBlockPreviewStyles();
  enhanceEmptyBlocks();
  
  // Améliorer les blocs existants
  setTimeout(() => {
    const existingBlocks = document.querySelectorAll('[data-type^="acf/"]');
    existingBlocks.forEach(enhanceACFBlock);
  }, 1000);
};

// Gestionnaire pour les aperçus en temps réel
const setupLivePreview = () => {
  // Écouter les changements dans les champs ACF
  document.addEventListener('change', (event) => {
    if (event.target.closest('.acf-field')) {
      // Déclencher une mise à jour de l'aperçu
      const blockElement = event.target.closest('[data-type^="acf/"]');
      if (blockElement) {
        // Simuler un changement pour forcer la mise à jour
        const changeEvent = new Event('input', { bubbles: true });
        blockElement.dispatchEvent(changeEvent);
      }
    }
  });
};

// Ajouter des raccourcis clavier pour les blocs
const addKeyboardShortcuts = () => {
  document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + Shift + B pour ouvrir le sélecteur de blocs personnalisés
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'B') {
      event.preventDefault();
      
      // Simuler un clic sur le bouton d'ajout de bloc
      const addBlockButton = document.querySelector('.block-editor-inserter__toggle');
      if (addBlockButton) {
        addBlockButton.click();
        
        // Filtrer sur les blocs personnalisés après un court délai
        setTimeout(() => {
          const searchInput = document.querySelector('.block-editor-inserter__search-input');
          if (searchInput) {
            searchInput.value = 'custom';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, 100);
      }
    }
  });
};

// Améliorer la catégorie des blocs personnalisés
const enhanceCustomBlocksCategory = () => {
  // Ajouter une icône personnalisée à la catégorie
  const style = document.createElement('style');
  style.textContent = `
    .block-editor-inserter__panel-content .block-editor-inserter__panel-title {
      position: relative;
    }
    
    .block-editor-inserter__panel-content .block-editor-inserter__panel-title:has-text("Blocs Personnalisés"):before {
      content: "🎨";
      margin-right: 8px;
    }
    
    .components-panel__body-title button[aria-expanded]:has-text("Blocs Personnalisés") {
      font-weight: bold;
      color: #2271b1;
    }
  `;
  document.head.appendChild(style);
};

// Utilitaires pour les développeurs
window.ACFBlocksUtils = {
  // Obtenir tous les blocs ACF sur la page
  getAllACFBlocks: () => {
    return document.querySelectorAll('[data-type^="acf/"]');
  },
  
  // Obtenir un bloc ACF par son type
  getACFBlocksByType: (blockType) => {
    return document.querySelectorAll(`[data-type="acf/${blockType}"]`);
  },
  
  // Recharger l'aperçu d'un bloc
  refreshBlockPreview: (blockElement) => {
    const refreshButton = blockElement.querySelector('.acf-block-component button[aria-label*="Update"]');
    if (refreshButton) {
      refreshButton.click();
    }
  },
  
  // Obtenir les données d'un bloc
  getBlockData: (blockElement) => {
    const blockId = blockElement.getAttribute('data-block');
    if (blockId && window.acf) {
      return window.acf.getFields({ parent: blockElement });
    }
    return null;
  }
};

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  // Attendre que l'éditeur soit chargé
  const waitForEditor = () => {
    if (document.querySelector('.block-editor')) {
      enhanceACFBlocks();
      setupLivePreview();
      addKeyboardShortcuts();
      enhanceCustomBlocksCategory();
    } else {
      setTimeout(waitForEditor, 500);
    }
  };
  
  waitForEditor();
});

// Support pour le rechargement à chaud en développement
if (module.hot) {
  module.hot.accept();
}
