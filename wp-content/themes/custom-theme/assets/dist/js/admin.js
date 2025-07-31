/******/ (() => { // webpackBootstrap
/*!****************************!*\
  !*** ./assets/js/admin.js ***!
  \****************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// JavaScript pour l'administration WordPress
var CustomThemeAdmin = /*#__PURE__*/function () {
  function CustomThemeAdmin() {
    _classCallCheck(this, CustomThemeAdmin);
    this.init();
  }
  return _createClass(CustomThemeAdmin, [{
    key: "init",
    value: function init() {
      this.initACFFields();
      this.initCustomizerPreview();
      this.bindAdminEvents();
    }
  }, {
    key: "initACFFields",
    value: function initACFFields() {
      var _this = this;
      // Améliorations pour les champs ACF
      if (typeof acf !== 'undefined') {
        // Validation personnalisée
        acf.add_filter('validation_complete', function (valid, form) {
          return _this.validateCustomFields(valid, form);
        });

        // Actions sur les changements de champs
        acf.add_action('change', function (input) {
          _this.handleFieldChange(input);
        });
      }
    }
  }, {
    key: "validateCustomFields",
    value: function validateCustomFields(valid, form) {
      // Validation personnalisée des champs ACF
      var titleField = form.find('[data-name="title"]');
      if (titleField.length && !titleField.val().trim()) {
        titleField.addClass('error');
        valid = false;
      }
      return valid;
    }
  }, {
    key: "handleFieldChange",
    value: function handleFieldChange(input) {
      var fieldName = input.attr('data-name');
      var fieldValue = input.val();
      switch (fieldName) {
        case 'title':
          this.updatePreview('title', fieldValue);
          break;
        case 'content':
          this.updatePreview('content', fieldValue);
          break;
      }
    }
  }, {
    key: "updatePreview",
    value: function updatePreview(field, value) {
      // Mise à jour du preview en temps réel
      var preview = document.querySelector('.acf-block-preview');
      if (preview) {
        var element = preview.querySelector("[data-field=\"".concat(field, "\"]"));
        if (element) {
          element.textContent = value;
        }
      }
    }
  }, {
    key: "initCustomizerPreview",
    value: function initCustomizerPreview() {
      // Support pour le Customizer WordPress
      if (typeof wp !== 'undefined' && wp.customize) {
        wp.customize('blogname', function (value) {
          value.bind(function (newval) {
            document.querySelector('.site-title').textContent = newval;
          });
        });
      }
    }
  }, {
    key: "bindAdminEvents",
    value: function bindAdminEvents() {
      var _this2 = this;
      // Événements spécifiques à l'admin
      document.addEventListener('click', function (e) {
        if (e.target.matches('.block-editor-block-list__block')) {
          _this2.handleBlockSelect(e.target);
        }
      });
    }
  }, {
    key: "handleBlockSelect",
    value: function handleBlockSelect(block) {
      // Actions lors de la sélection d'un bloc
      if (block.classList.contains('wp-block-custom-theme-custom-block')) {
        this.highlightCustomFields();
      }
    }
  }, {
    key: "highlightCustomFields",
    value: function highlightCustomFields() {
      // Mettre en évidence les champs ACF correspondants
      var acfFields = document.querySelectorAll('.acf-field');
      acfFields.forEach(function (field) {
        field.classList.add('highlighted');
        setTimeout(function () {
          field.classList.remove('highlighted');
        }, 2000);
      });
    }
  }]);
}(); // Initialisation pour l'admin
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('wp-admin')) {
    new CustomThemeAdmin();
  }
});

// Support pour l'éditeur Gutenberg
if (typeof wp !== 'undefined' && wp.blocks) {
  wp.domReady(function () {
    new CustomThemeAdmin();
  });
}
/******/ })()
;
//# sourceMappingURL=admin.js.map