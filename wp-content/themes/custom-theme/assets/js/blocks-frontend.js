/**
 * JavaScript principal pour les blocs (frontend)
 * Ce fichier charge tous les scripts nécessaires pour les blocs côté frontend
 */

// Classe principale pour gérer les blocs
class BlocksManager {
  constructor() {
    this.blocks = new Map();
    this.init();
  }

  init() {
    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeBlocks());
    } else {
      this.initializeBlocks();
    }

    // Gérer le chargement dynamique de contenu (AJAX, etc.)
    this.observeNewContent();
  }

  /**
   * Initialise tous les blocs présents sur la page
   */
  initializeBlocks() {
    // Auto-découverte des blocs
    const blockElements = document.querySelectorAll('[class*="block-"]');
    
    blockElements.forEach(element => {
      this.initializeBlock(element);
    });

    // Déclencher l'événement personnalisé
    document.dispatchEvent(new CustomEvent('blocksInitialized', {
      detail: { blocksCount: blockElements.length }
    }));
  }

  /**
   * Initialise un bloc spécifique
   */
  initializeBlock(element) {
    const classList = Array.from(element.classList);
    const blockClass = classList.find(cls => cls.startsWith('block-'));
    
    if (!blockClass) return;

    const blockName = blockClass.replace('block-', '');
    const blockId = element.dataset.blockId || this.generateBlockId();
    
    // Éviter la double initialisation
    if (element.dataset.initialized) return;
    
    element.dataset.initialized = 'true';
    element.dataset.blockId = blockId;

    // Stocker la référence du bloc
    this.blocks.set(blockId, {
      name: blockName,
      element: element,
      initialized: true
    });

    // Déclencher l'événement d'initialisation du bloc
    element.dispatchEvent(new CustomEvent('blockInitialized', {
      detail: { blockName, blockId },
      bubbles: true
    }));
  }

  /**
   * Observer les nouveaux contenus ajoutés dynamiquement
   */
  observeNewContent() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Vérifier si le nœud lui-même est un bloc
            if (node.classList && Array.from(node.classList).some(cls => cls.startsWith('block-'))) {
              this.initializeBlock(node);
            }
            
            // Vérifier les blocs dans les nœuds enfants
            const childBlocks = node.querySelectorAll ? node.querySelectorAll('[class*="block-"]') : [];
            childBlocks.forEach(childBlock => {
              this.initializeBlock(childBlock);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Génère un ID unique pour un bloc
   */
  generateBlockId() {
    return 'block-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Obtenir un bloc par son ID
   */
  getBlock(blockId) {
    return this.blocks.get(blockId);
  }

  /**
   * Obtenir tous les blocs d'un type spécifique
   */
  getBlocksByType(blockName) {
    return Array.from(this.blocks.values()).filter(block => block.name === blockName);
  }

  /**
   * Nettoyer les blocs supprimés
   */
  cleanup() {
    this.blocks.forEach((block, blockId) => {
      if (!document.contains(block.element)) {
        this.blocks.delete(blockId);
      }
    });
  }
}

// Initialiser le gestionnaire de blocs
const blocksManager = new BlocksManager();

// Exposer le gestionnaire globalement pour d'autres scripts
window.BlocksManager = blocksManager;

// Utilitaires globaux pour les blocs
window.BlockUtils = {
  // Animer un élément avec Intersection Observer
  animateOnScroll: (element, animationClass = 'animate-in', threshold = 0.1) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    observer.observe(element);
  },

  // Charger un script de manière asynchrone
  loadScript: (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  // Throttle pour les événements de performance
  throttle: (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },

  // Debounce pour les événements de saisie
  debounce: (func, delay) => {
    let timeoutId;
    
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
};
