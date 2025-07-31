/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./assets/js/blocks-frontend.js ***!
  \**************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * JavaScript principal pour les blocs (frontend)
 * Ce fichier charge tous les scripts nécessaires pour les blocs côté frontend
 */
// Classe principale pour gérer les blocs
var BlocksManager = /*#__PURE__*/function () {
  function BlocksManager() {
    _classCallCheck(this, BlocksManager);
    this.blocks = new Map();
    this.init();
  }
  return _createClass(BlocksManager, [{
    key: "init",
    value: function init() {
      var _this = this;
      // Attendre que le DOM soit prêt
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          return _this.initializeBlocks();
        });
      } else {
        this.initializeBlocks();
      }

      // Gérer le chargement dynamique de contenu (AJAX, etc.)
      this.observeNewContent();
    }

    /**
     * Initialise tous les blocs présents sur la page
     */
  }, {
    key: "initializeBlocks",
    value: function initializeBlocks() {
      var _this2 = this;
      // Auto-découverte des blocs
      var blockElements = document.querySelectorAll('[class*="block-"]');
      blockElements.forEach(function (element) {
        _this2.initializeBlock(element);
      });

      // Déclencher l'événement personnalisé
      document.dispatchEvent(new CustomEvent('blocksInitialized', {
        detail: {
          blocksCount: blockElements.length
        }
      }));
    }

    /**
     * Initialise un bloc spécifique
     */
  }, {
    key: "initializeBlock",
    value: function initializeBlock(element) {
      var classList = Array.from(element.classList);
      var blockClass = classList.find(function (cls) {
        return cls.startsWith('block-');
      });
      if (!blockClass) return;
      var blockName = blockClass.replace('block-', '');
      var blockId = element.dataset.blockId || this.generateBlockId();

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
        detail: {
          blockName: blockName,
          blockId: blockId
        },
        bubbles: true
      }));
    }

    /**
     * Observer les nouveaux contenus ajoutés dynamiquement
     */
  }, {
    key: "observeNewContent",
    value: function observeNewContent() {
      var _this3 = this;
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Vérifier si le nœud lui-même est un bloc
              if (node.classList && Array.from(node.classList).some(function (cls) {
                return cls.startsWith('block-');
              })) {
                _this3.initializeBlock(node);
              }

              // Vérifier les blocs dans les nœuds enfants
              var childBlocks = node.querySelectorAll ? node.querySelectorAll('[class*="block-"]') : [];
              childBlocks.forEach(function (childBlock) {
                _this3.initializeBlock(childBlock);
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
  }, {
    key: "generateBlockId",
    value: function generateBlockId() {
      return 'block-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Obtenir un bloc par son ID
     */
  }, {
    key: "getBlock",
    value: function getBlock(blockId) {
      return this.blocks.get(blockId);
    }

    /**
     * Obtenir tous les blocs d'un type spécifique
     */
  }, {
    key: "getBlocksByType",
    value: function getBlocksByType(blockName) {
      return Array.from(this.blocks.values()).filter(function (block) {
        return block.name === blockName;
      });
    }

    /**
     * Nettoyer les blocs supprimés
     */
  }, {
    key: "cleanup",
    value: function cleanup() {
      var _this4 = this;
      this.blocks.forEach(function (block, blockId) {
        if (!document.contains(block.element)) {
          _this4.blocks.delete(blockId);
        }
      });
    }
  }]);
}(); // Initialiser le gestionnaire de blocs
var blocksManager = new BlocksManager();

// Exposer le gestionnaire globalement pour d'autres scripts
window.BlocksManager = blocksManager;

// Utilitaires globaux pour les blocs
window.BlockUtils = {
  // Animer un élément avec Intersection Observer
  animateOnScroll: function animateOnScroll(element) {
    var animationClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'animate-in';
    var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: threshold
    });
    observer.observe(element);
  },
  // Charger un script de manière asynchrone
  loadScript: function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },
  // Throttle pour les événements de performance
  throttle: function throttle(func, delay) {
    var timeoutId;
    var lastExecTime = 0;
    return function () {
      var _this5 = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          func.apply(_this5, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },
  // Debounce pour les événements de saisie
  debounce: function debounce(func, delay) {
    var timeoutId;
    return function () {
      var _this6 = this;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        return func.apply(_this6, args);
      }, delay);
    };
  }
};
/******/ })()
;
//# sourceMappingURL=blocks-frontend.js.map