/**
 * JavaScript moderne pour le bloc Hero Section
 * Utilise ES6+ sans jQuery
 */

class HeroSection {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
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
  initAnimations() {
    // Utiliser Intersection Observer pour déclencher les animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerAnimations();
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
  triggerAnimations() {
    const animatedElements = this.element.querySelectorAll('[data-animate]');
    
    animatedElements.forEach((element, index) => {
      const animationType = element.dataset.animate;
      const delay = element.dataset.delay || (index * 200);
      
      setTimeout(() => {
        element.classList.add(`animate-${animationType}`);
        element.style.animationDelay = '0s'; // Reset delay after timeout
      }, parseInt(delay));
    });
  }

  /**
   * Initialise l'effet parallax sur l'image de fond
   */
  initParallax() {
    const backgroundImage = this.element.querySelector('.hero-section__bg-image');
    
    if (!backgroundImage) return;

    // Utiliser requestAnimationFrame pour une performance optimale
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const elementTop = this.element.offsetTop;
      const elementHeight = this.element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculer si l'élément est visible
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const rate = (scrolled - elementTop) / (elementHeight + windowHeight);
        const yPos = Math.round(rate * 50); // Ajuster la vitesse du parallax
        
        backgroundImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Écouter le scroll avec throttling
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Nettoyage quand l'élément est supprimé
    this.cleanupFunctions = this.cleanupFunctions || [];
    this.cleanupFunctions.push(() => {
      window.removeEventListener('scroll', requestTick);
    });
  }

  /**
   * Gère les vidéos de fond (si ajoutées plus tard)
   */
  initBackgroundVideo() {
    const video = this.element.querySelector('.hero-section__bg-video');
    
    if (!video) return;

    // Optimiser la vidéo pour mobile
    if (window.innerWidth < 768) {
      video.remove();
      return;
    }

    // Assurer que la vidéo est mise en pause quand elle n'est pas visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.element);
  }

  /**
   * Ajoute des interactions améliorées aux boutons
   */
  initButtonInteractions() {
    const buttons = this.element.querySelectorAll('.hero-section__button');
    
    buttons.forEach(button => {
      // Effet de ripple au clic
      button.addEventListener('click', this.createRippleEffect.bind(this));
      
      // Analytics/tracking personnalisé
      button.addEventListener('click', (e) => {
        this.trackButtonClick(button, e);
      });
    });
  }

  /**
   * Crée un effet de ripple sur les boutons
   */
  createRippleEffect(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'button-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    // Ajouter les keyframes si elles n'existent pas
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .hero-section__button {
          position: relative;
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    // Supprimer l'élément après l'animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  /**
   * Track les clics sur les boutons pour l'analytics
   */
  trackButtonClick(button, event) {
    const buttonText = button.textContent.trim();
    const buttonType = button.classList.contains('btn--primary') ? 'primary' : 'secondary';
    const heroTitle = this.element.querySelector('.hero-section__title')?.textContent?.trim();
    
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
        buttonText,
        buttonType,
        heroTitle,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Fonction de nettoyage pour éviter les fuites mémoire
   */
  destroy() {
    if (this.cleanupFunctions) {
      this.cleanupFunctions.forEach(cleanup => cleanup());
    }
  }
}

/**
 * Auto-initialisation quand le DOM est prêt
 */
document.addEventListener('DOMContentLoaded', () => {
  const heroSections = document.querySelectorAll('.hero-section');
  
  heroSections.forEach(heroElement => {
    new HeroSection(heroElement);
  });
});

/**
 * Support pour le chargement dynamique (AJAX, etc.)
 */
window.initHeroSection = (element) => {
  return new HeroSection(element);
};

/**
 * Utilities pour d'autres scripts
 */
window.HeroSectionUtils = {
  // Fonction pour animer manuellement un hero
  animateHero: (heroElement) => {
    const instance = new HeroSection(heroElement);
    instance.triggerAnimations();
    return instance;
  },
  
  // Fonction pour obtenir la hauteur d'un hero
  getHeroHeight: (heroElement) => {
    return heroElement.offsetHeight;
  },
  
  // Fonction pour faire défiler jusqu'à un hero
  scrollToHero: (heroElement, offset = 0) => {
    const elementPosition = heroElement.offsetTop;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
