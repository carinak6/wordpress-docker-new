/**
 * JavaScript pour le bloc Card
 * Gère les interactions et animations
 */

class CardBlock {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Initialiser les animations d'entrée
    this.initAnimations();
    
    // Gérer les interactions des boutons
    this.initButtonInteractions();
    
    // Ajouter les effets de hover personnalisés
    this.initHoverEffects();
  }

  /**
   * Initialise les animations d'entrée avec Intersection Observer
   */
  initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card--animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const card = this.element.querySelector('.card');
    if (card) {
      observer.observe(card);
    }
  }

  /**
   * Gère les interactions des boutons avec analytics
   */
  initButtonInteractions() {
    const button = this.element.querySelector('.card__button');
    
    if (button) {
      button.addEventListener('click', (e) => {
        // Ajouter une classe pour l'animation de clic
        button.classList.add('card__button--clicked');
        
        // Retirer la classe après l'animation
        setTimeout(() => {
          button.classList.remove('card__button--clicked');
        }, 200);

        // Analytics ou tracking ici si nécessaire
        this.trackButtonClick(button.getAttribute('href'));
      });
    }
  }

  /**
   * Effets de hover personnalisés
   */
  initHoverEffects() {
    const card = this.element.querySelector('.card');
    
    if (card) {
      // Effet parallax subtil sur l'image
      const image = card.querySelector('.card__image img');
      
      if (image) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          
          const tiltX = (y - 0.5) * 5; // Inclinaison subtile
          const tiltY = (x - 0.5) * -5;
          
          image.style.transform = `scale(1.05) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
          image.style.transform = 'scale(1.05) rotateX(0deg) rotateY(0deg)';
        });
      }
    }
  }

  /**
   * Tracking des clics sur les boutons (à adapter selon vos besoins)
   */
  trackButtonClick(url) {
    // Exemple avec Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'card_button_click', {
        'card_url': url,
        'event_category': 'engagement',
        'event_label': 'Card CTA'
      });
    }
    
    // Ou avec d'autres solutions de tracking
    console.log('Card button clicked:', url);
  }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
  const cardBlocks = document.querySelectorAll('.block-card');
  cardBlocks.forEach(block => new CardBlock(block));
});

// CSS pour les animations
const style = document.createElement('style');
style.textContent = `
  .card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .card--animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card__button--clicked {
    transform: translateY(-1px) scale(0.98);
  }
  
  .card__image img {
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);
