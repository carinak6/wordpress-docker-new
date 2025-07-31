/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = wp.blockEditor;

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = wp.blocks;

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = wp.i18n;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./assets/js/blocks-editor.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/**
 * JavaScript pour l'éditeur Gutenberg
 * Améliore l'expérience d'édition des blocs personnalisés
 */





// Fonction pour améliorer les blocs ACF dans l'éditeur
var enhanceACFBlocks = function enhanceACFBlocks() {
  // Ajouter des styles personnalisés pour l'aperçu des blocs
  var addBlockPreviewStyles = function addBlockPreviewStyles() {
    var style = document.createElement('style');
    style.textContent = "\n      .acf-block-preview {\n        border: 2px dashed #ccc;\n        padding: 20px;\n        text-align: center;\n        background: #f9f9f9;\n        margin: 10px 0;\n      }\n      \n      .acf-block-preview.has-background {\n        background-size: cover;\n        background-position: center;\n      }\n      \n      .acf-block-preview .block-preview-label {\n        background: rgba(0,0,0,0.7);\n        color: white;\n        padding: 5px 10px;\n        border-radius: 3px;\n        font-size: 12px;\n        display: inline-block;\n        margin-bottom: 10px;\n      }\n    ";
    document.head.appendChild(style);
  };

  // Améliorer l'affichage des blocs vides
  var enhanceEmptyBlocks = function enhanceEmptyBlocks() {
    // Observer les changements dans l'éditeur
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            var acfBlocks = node.querySelectorAll ? node.querySelectorAll('[data-type^="acf/"]') : [];
            acfBlocks.forEach(enhanceACFBlock);
          }
        });
      });
    });

    // Observer l'éditeur
    var editor = document.querySelector('.block-editor');
    if (editor) {
      observer.observe(editor, {
        childList: true,
        subtree: true
      });
    }
  };

  // Améliorer un bloc ACF spécifique
  var enhanceACFBlock = function enhanceACFBlock(blockElement) {
    if (blockElement.dataset.enhanced) return;
    blockElement.dataset.enhanced = 'true';

    // Ajouter un indicateur visuel pour les blocs vides
    var blockContent = blockElement.querySelector('.acf-block-body');
    if (blockContent && !blockContent.textContent.trim()) {
      blockContent.classList.add('acf-block-preview');
      var blockType = blockElement.dataset.type.replace('acf/', '');
      var label = document.createElement('div');
      label.className = 'block-preview-label';
      label.textContent = "Bloc ".concat(blockType, " - Cliquez pour configurer");
      blockContent.prepend(label);
    }
  };

  // Initialiser les améliorations
  addBlockPreviewStyles();
  enhanceEmptyBlocks();

  // Améliorer les blocs existants
  setTimeout(function () {
    var existingBlocks = document.querySelectorAll('[data-type^="acf/"]');
    existingBlocks.forEach(enhanceACFBlock);
  }, 1000);
};

// Gestionnaire pour les aperçus en temps réel
var setupLivePreview = function setupLivePreview() {
  // Écouter les changements dans les champs ACF
  document.addEventListener('change', function (event) {
    if (event.target.closest('.acf-field')) {
      // Déclencher une mise à jour de l'aperçu
      var blockElement = event.target.closest('[data-type^="acf/"]');
      if (blockElement) {
        // Simuler un changement pour forcer la mise à jour
        var changeEvent = new Event('input', {
          bubbles: true
        });
        blockElement.dispatchEvent(changeEvent);
      }
    }
  });
};

// Ajouter des raccourcis clavier pour les blocs
var addKeyboardShortcuts = function addKeyboardShortcuts() {
  document.addEventListener('keydown', function (event) {
    // Ctrl/Cmd + Shift + B pour ouvrir le sélecteur de blocs personnalisés
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'B') {
      event.preventDefault();

      // Simuler un clic sur le bouton d'ajout de bloc
      var addBlockButton = document.querySelector('.block-editor-inserter__toggle');
      if (addBlockButton) {
        addBlockButton.click();

        // Filtrer sur les blocs personnalisés après un court délai
        setTimeout(function () {
          var searchInput = document.querySelector('.block-editor-inserter__search-input');
          if (searchInput) {
            searchInput.value = 'custom';
            searchInput.dispatchEvent(new Event('input', {
              bubbles: true
            }));
          }
        }, 100);
      }
    }
  });
};

// Améliorer la catégorie des blocs personnalisés
var enhanceCustomBlocksCategory = function enhanceCustomBlocksCategory() {
  // Ajouter une icône personnalisée à la catégorie
  var style = document.createElement('style');
  style.textContent = "\n    .block-editor-inserter__panel-content .block-editor-inserter__panel-title {\n      position: relative;\n    }\n    \n    .block-editor-inserter__panel-content .block-editor-inserter__panel-title:has-text(\"Blocs Personnalis\xE9s\"):before {\n      content: \"\uD83C\uDFA8\";\n      margin-right: 8px;\n    }\n    \n    .components-panel__body-title button[aria-expanded]:has-text(\"Blocs Personnalis\xE9s\") {\n      font-weight: bold;\n      color: #2271b1;\n    }\n  ";
  document.head.appendChild(style);
};

// Utilitaires pour les développeurs
window.ACFBlocksUtils = {
  // Obtenir tous les blocs ACF sur la page
  getAllACFBlocks: function getAllACFBlocks() {
    return document.querySelectorAll('[data-type^="acf/"]');
  },
  // Obtenir un bloc ACF par son type
  getACFBlocksByType: function getACFBlocksByType(blockType) {
    return document.querySelectorAll("[data-type=\"acf/".concat(blockType, "\"]"));
  },
  // Recharger l'aperçu d'un bloc
  refreshBlockPreview: function refreshBlockPreview(blockElement) {
    var refreshButton = blockElement.querySelector('.acf-block-component button[aria-label*="Update"]');
    if (refreshButton) {
      refreshButton.click();
    }
  },
  // Obtenir les données d'un bloc
  getBlockData: function getBlockData(blockElement) {
    var blockId = blockElement.getAttribute('data-block');
    if (blockId && window.acf) {
      return window.acf.getFields({
        parent: blockElement
      });
    }
    return null;
  }
};

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function () {
  // Attendre que l'éditeur soit chargé
  var _waitForEditor = function waitForEditor() {
    if (document.querySelector('.block-editor')) {
      enhanceACFBlocks();
      setupLivePreview();
      addKeyboardShortcuts();
      enhanceCustomBlocksCategory();
    } else {
      setTimeout(_waitForEditor, 500);
    }
  };
  _waitForEditor();
});

// Support pour le rechargement à chaud en développement
if (false) // removed by dead control flow
{}
})();

/******/ })()
;
//# sourceMappingURL=blocks-editor.js.map