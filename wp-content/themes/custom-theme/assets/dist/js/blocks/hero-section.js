/******/ (() => { // webpackBootstrap
/*!******************************************!*\
  !*** ./assets/js/blocks/hero-section.js ***!
  \******************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * JavaScript moderne pour le bloc Hero Section
 * Utilise ES6+ sans jQuery
 */
var HeroSection = /*#__PURE__*/function () {
  function HeroSection(element) {
    _classCallCheck(this, HeroSection);
    this.element = element;
    this.init();
  }
  return _createClass(HeroSection, [{
    key: "init",
    value: function init() {
      // Initialiser les animations
      this.initAnimations();

      // Initialiser le parallax si une image de fond est présente
      this.initParallax();

      // Initialiser l'auto-resize pour les vidéos de fond
      this.initBackgroundVideo();

      // Gérer les interactions des boutons
      this.initButtonInteractions();
    }

    /**
     * Initialise les animations d'entrée
     */
  }, {
    key: "initAnimations",
    value: function initAnimations() {
      var _this = this;
      // Utiliser Intersection Observer pour déclencher les animations
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            _this.triggerAnimations();
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      });
      observer.observe(this.element);
    }

    /**
     * Déclenche les animations des éléments
     */
  }, {
    key: "triggerAnimations",
    value: function triggerAnimations() {
      var animatedElements = this.element.querySelectorAll('[data-animate]');
      animatedElements.forEach(function (element, index) {
        var animationType = element.dataset.animate;
        var delay = element.dataset.delay || index * 200;
        setTimeout(function () {
          element.classList.add("animate-".concat(animationType));
          element.style.animationDelay = '0s'; // Reset delay after timeout
        }, parseInt(delay));
      });
    }

    /**
     * Initialise l'effet parallax sur l'image de fond
     */
  }, {
    key: "initParallax",
    value: function initParallax() {
      var _this2 = this;
      var backgroundImage = this.element.querySelector('.hero-section__bg-image');
      if (!backgroundImage) return;

      // Utiliser requestAnimationFrame pour une performance optimale
      var ticking = false;
      var updateParallax = function updateParallax() {
        var scrolled = window.pageYOffset;
        var elementTop = _this2.element.offsetTop;
        var elementHeight = _this2.element.offsetHeight;
        var windowHeight = window.innerHeight;

        // Calculer si l'élément est visible
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          var rate = (scrolled - elementTop) / (elementHeight + windowHeight);
          var yPos = Math.round(rate * 50); // Ajuster la vitesse du parallax

          backgroundImage.style.transform = "translate3d(0, ".concat(yPos, "px, 0)");
        }
        ticking = false;
      };
      var requestTick = function requestTick() {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };

      // Écouter le scroll avec throttling
      window.addEventListener('scroll', requestTick, {
        passive: true
      });

      // Nettoyage quand l'élément est supprimé
      this.cleanupFunctions = this.cleanupFunctions || [];
      this.cleanupFunctions.push(function () {
        window.removeEventListener('scroll', requestTick);
      });
    }

    /**
     * Gère les vidéos de fond (si ajoutées plus tard)
     */
  }, {
    key: "initBackgroundVideo",
    value: function initBackgroundVideo() {
      var video = this.element.querySelector('.hero-section__bg-video');
      if (!video) return;

      // Optimiser la vidéo pour mobile
      if (window.innerWidth < 768) {
        video.remove();
        return;
      }

      // Assurer que la vidéo est mise en pause quand elle n'est pas visible
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            video.play().catch(console.error);
          } else {
            video.pause();
          }
        });
      }, {
        threshold: 0.5
      });
      observer.observe(this.element);
    }

    /**
     * Ajoute des interactions améliorées aux boutons
     */
  }, {
    key: "initButtonInteractions",
    value: function initButtonInteractions() {
      var _this3 = this;
      var buttons = this.element.querySelectorAll('.hero-section__button');
      buttons.forEach(function (button) {
        // Effet de ripple au clic
        button.addEventListener('click', _this3.createRippleEffect.bind(_this3));

        // Analytics/tracking personnalisé
        button.addEventListener('click', function (e) {
          _this3.trackButtonClick(button, e);
        });
      });
    }

    /**
     * Crée un effet de ripple sur les boutons
     */
  }, {
    key: "createRippleEffect",
    value: function createRippleEffect(event) {
      var button = event.currentTarget;
      var rect = button.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = event.clientX - rect.left - size / 2;
      var y = event.clientY - rect.top - size / 2;
      var ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.style.cssText = "\n      position: absolute;\n      width: ".concat(size, "px;\n      height: ").concat(size, "px;\n      left: ").concat(x, "px;\n      top: ").concat(y, "px;\n      background: rgba(255, 255, 255, 0.3);\n      border-radius: 50%;\n      transform: scale(0);\n      animation: ripple 0.6s linear;\n      pointer-events: none;\n    ");

      // Ajouter les keyframes si elles n'existent pas
      if (!document.querySelector('#ripple-styles')) {
        var style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = "\n        @keyframes ripple {\n          to {\n            transform: scale(4);\n            opacity: 0;\n          }\n        }\n        .hero-section__button {\n          position: relative;\n          overflow: hidden;\n        }\n      ";
        document.head.appendChild(style);
      }
      button.appendChild(ripple);

      // Supprimer l'élément après l'animation
      setTimeout(function () {
        ripple.remove();
      }, 600);
    }

    /**
     * Track les clics sur les boutons pour l'analytics
     */
  }, {
    key: "trackButtonClick",
    value: function trackButtonClick(button, event) {
      var _this$element$querySe;
      var buttonText = button.textContent.trim();
      var buttonType = button.classList.contains('btn--primary') ? 'primary' : 'secondary';
      var heroTitle = (_this$element$querySe = this.element.querySelector('.hero-section__title')) === null || _this$element$querySe === void 0 || (_this$element$querySe = _this$element$querySe.textContent) === null || _this$element$querySe === void 0 ? void 0 : _this$element$querySe.trim();

      // Envoyer à Google Analytics si disponible
      if (typeof gtag !== 'undefined') {
        gtag('event', 'hero_button_click', {
          button_text: buttonText,
          button_type: buttonType,
          hero_title: heroTitle,
          section_id: this.element.id || 'unnamed'
        });
      }

      // Ou utiliser un système d'analytics personnalisé
      if (window.customAnalytics) {
        window.customAnalytics.track('Hero Button Click', {
          buttonText: buttonText,
          buttonType: buttonType,
          heroTitle: heroTitle,
          timestamp: new Date().toISOString()
        });
      }
    }

    /**
     * Fonction de nettoyage pour éviter les fuites mémoire
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.cleanupFunctions) {
        this.cleanupFunctions.forEach(function (cleanup) {
          return cleanup();
        });
      }
    }
  }]);
}();
/**
 * Auto-initialisation quand le DOM est prêt
 */
document.addEventListener('DOMContentLoaded', function () {
  var heroSections = document.querySelectorAll('.hero-section');
  heroSections.forEach(function (heroElement) {
    new HeroSection(heroElement);
  });
});

/**
 * Support pour le chargement dynamique (AJAX, etc.)
 */
window.initHeroSection = function (element) {
  return new HeroSection(element);
};

/**
 * Utilities pour d'autres scripts
 */
window.HeroSectionUtils = {
  // Fonction pour animer manuellement un hero
  animateHero: function animateHero(heroElement) {
    var instance = new HeroSection(heroElement);
    instance.triggerAnimations();
    return instance;
  },
  // Fonction pour obtenir la hauteur d'un hero
  getHeroHeight: function getHeroHeight(heroElement) {
    return heroElement.offsetHeight;
  },
  // Fonction pour faire défiler jusqu'à un hero
  scrollToHero: function scrollToHero(heroElement) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var elementPosition = heroElement.offsetTop;
    var offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
/******/ })()
;
//# sourceMappingURL=hero-section.js.map