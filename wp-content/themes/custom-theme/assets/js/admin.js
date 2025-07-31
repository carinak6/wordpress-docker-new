// JavaScript pour l'administration WordPress
class CustomThemeAdmin {
    constructor() {
        this.init();
    }

    init() {
        this.initACFFields();
        this.initCustomizerPreview();
        this.bindAdminEvents();
    }

    initACFFields() {
        // Améliorations pour les champs ACF
        if (typeof acf !== 'undefined') {
            // Validation personnalisée
            acf.add_filter('validation_complete', (valid, form) => {
                return this.validateCustomFields(valid, form);
            });

            // Actions sur les changements de champs
            acf.add_action('change', (input) => {
                this.handleFieldChange(input);
            });
        }
    }

    validateCustomFields(valid, form) {
        // Validation personnalisée des champs ACF
        const titleField = form.find('[data-name="title"]');
        if (titleField.length && !titleField.val().trim()) {
            titleField.addClass('error');
            valid = false;
        }

        return valid;
    }

    handleFieldChange(input) {
        const fieldName = input.attr('data-name');
        const fieldValue = input.val();

        switch(fieldName) {
            case 'title':
                this.updatePreview('title', fieldValue);
                break;
            case 'content':
                this.updatePreview('content', fieldValue);
                break;
        }
    }

    updatePreview(field, value) {
        // Mise à jour du preview en temps réel
        const preview = document.querySelector('.acf-block-preview');
        if (preview) {
            const element = preview.querySelector(`[data-field="${field}"]`);
            if (element) {
                element.textContent = value;
            }
        }
    }

    initCustomizerPreview() {
        // Support pour le Customizer WordPress
        if (typeof wp !== 'undefined' && wp.customize) {
            wp.customize('blogname', (value) => {
                value.bind((newval) => {
                    document.querySelector('.site-title').textContent = newval;
                });
            });
        }
    }

    bindAdminEvents() {
        // Événements spécifiques à l'admin
        document.addEventListener('click', (e) => {
            if (e.target.matches('.block-editor-block-list__block')) {
                this.handleBlockSelect(e.target);
            }
        });
    }

    handleBlockSelect(block) {
        // Actions lors de la sélection d'un bloc
        if (block.classList.contains('wp-block-custom-theme-custom-block')) {
            this.highlightCustomFields();
        }
    }

    highlightCustomFields() {
        // Mettre en évidence les champs ACF correspondants
        const acfFields = document.querySelectorAll('.acf-field');
        acfFields.forEach(field => {
            field.classList.add('highlighted');
            setTimeout(() => {
                field.classList.remove('highlighted');
            }, 2000);
        });
    }
}

// Initialisation pour l'admin
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('wp-admin')) {
        new CustomThemeAdmin();
    }
});

// Support pour l'éditeur Gutenberg
if (typeof wp !== 'undefined' && wp.blocks) {
    wp.domReady(() => {
        new CustomThemeAdmin();
    });
}
