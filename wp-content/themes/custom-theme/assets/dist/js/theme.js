/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scss/style.scss":
/*!********************************!*\
  !*** ./assets/scss/style.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!****************************!*\
  !*** ./assets/js/theme.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./assets/scss/style.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Import du SCSS principal


// JavaScript principal du thème
var CustomTheme = /*#__PURE__*/function () {
  function CustomTheme() {
    _classCallCheck(this, CustomTheme);
    this.init();
  }
  return _createClass(CustomTheme, [{
    key: "init",
    value: function init() {
      this.bindEvents();
      this.initBlocks();
      this.initAnimations();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      // Menu mobile toggle
      var menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) {
        menuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
      }
    }
  }, {
    key: "toggleMobileMenu",
    value: function toggleMobileMenu() {
      var navigation = document.querySelector('.main-navigation');
      if (navigation) {
        navigation.classList.toggle('toggled');
      }
    }
  }, {
    key: "initBlocks",
    value: function initBlocks() {
      var _this = this;
      // Initialisation des blocs personnalisés
      var customBlocks = document.querySelectorAll('.wp-block-custom-theme-custom-block');
      customBlocks.forEach(function (block) {
        _this.initBlockAnimations(block);
        _this.initBlockInteractions(block);
      });
    }
  }, {
    key: "initBlockAnimations",
    value: function initBlockAnimations(block) {
      // Animation au scroll avec Intersection Observer
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      observer.observe(block);
    }
  }, {
    key: "initBlockInteractions",
    value: function initBlockInteractions(block) {
      var _this2 = this;
      // Interactions hover
      block.addEventListener('mouseenter', function () {
        block.classList.add('is-hovered');
      });
      block.addEventListener('mouseleave', function () {
        block.classList.remove('is-hovered');
      });

      // Click interactions
      var interactiveElements = block.querySelectorAll('button, a, [data-action]');
      interactiveElements.forEach(function (element) {
        element.addEventListener('click', function (e) {
          _this2.handleBlockAction(e, block);
        });
      });
    }
  }, {
    key: "handleBlockAction",
    value: function handleBlockAction(event, block) {
      var action = event.target.dataset.action;
      switch (action) {
        case 'toggle':
          block.classList.toggle('is-expanded');
          break;
        case 'animate':
          block.classList.add('animate-pulse');
          setTimeout(function () {
            block.classList.remove('animate-pulse');
          }, 1000);
          break;
        default:
          // Actions personnalisées
          break;
      }
    }
  }, {
    key: "initAnimations",
    value: function initAnimations() {
      // Animations CSS personnalisées
      var animatedElements = document.querySelectorAll('[data-animate]');
      var animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var animationType = entry.target.dataset.animate;
            entry.target.classList.add("animate-".concat(animationType));
          }
        });
      }, {
        threshold: 0.2
      });
      animatedElements.forEach(function (element) {
        animationObserver.observe(element);
      });
    }
  }]);
}(); // Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function () {
  new CustomTheme();
});

// Support pour les blocs chargés dynamiquement
document.addEventListener('block-loaded', function (event) {
  var theme = new CustomTheme();
  theme.initBlocks();
});
})();

/******/ })()
;
//# sourceMappingURL=theme.js.map