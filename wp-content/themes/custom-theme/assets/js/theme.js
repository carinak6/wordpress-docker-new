// Import du SCSS principal
import '../scss/style.scss';

// JavaScript principal du thème
class CustomTheme {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initBlocks();
        this.initAnimations();
    }

    bindEvents() {
        // Menu mobile toggle
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
    }

    toggleMobileMenu() {
        const navigation = document.querySelector('.main-navigation');
        if (navigation) {
            navigation.classList.toggle('toggled');
        }
    }

    initBlocks() {
        // Initialisation des blocs personnalisés
        const customBlocks = document.querySelectorAll('.wp-block-custom-theme-custom-block');
        
        customBlocks.forEach(block => {
            this.initBlockAnimations(block);
            this.initBlockInteractions(block);
        });
    }

    initBlockAnimations(block) {
        // Animation au scroll avec Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        observer.observe(block);
    }

    initBlockInteractions(block) {
        // Interactions hover
        block.addEventListener('mouseenter', () => {
            block.classList.add('is-hovered');
        });
        
        block.addEventListener('mouseleave', () => {
            block.classList.remove('is-hovered');
        });

        // Click interactions
        const interactiveElements = block.querySelectorAll('button, a, [data-action]');
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.handleBlockAction(e, block);
            });
        });
    }

    handleBlockAction(event, block) {
        const action = event.target.dataset.action;
        
        switch(action) {
            case 'toggle':
                block.classList.toggle('is-expanded');
                break;
            case 'animate':
                block.classList.add('animate-pulse');
                setTimeout(() => {
                    block.classList.remove('animate-pulse');
                }, 1000);
                break;
            default:
                // Actions personnalisées
                break;
        }
    }

    initAnimations() {
        // Animations CSS personnalisées
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const animationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const animationType = entry.target.dataset.animate;
                        entry.target.classList.add(`animate-${animationType}`);
                    }
                });
            },
            { threshold: 0.2 }
        );

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
}

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new CustomTheme();
});

// Support pour les blocs chargés dynamiquement
document.addEventListener('block-loaded', (event) => {
    const theme = new CustomTheme();
    theme.initBlocks();
});
