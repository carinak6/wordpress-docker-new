import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import '../../scss/blocks/custom-block.scss';

registerBlockType('custom-theme/custom-block', {
    title: __('Bloc Personnalisé', 'custom-theme'),
    description: __('Un bloc personnalisé avec ACF Pro et Timber', 'custom-theme'),
    icon: 'admin-comments',
    category: 'common',
    keywords: [
        __('custom', 'custom-theme'),
        __('acf', 'custom-theme'),
        __('timber', 'custom-theme')
    ],
    supports: {
        align: ['left', 'center', 'right', 'wide', 'full'],
        anchor: true,
        customClassName: true,
        spacing: {
            margin: true,
            padding: true
        }
    },
    example: {
        attributes: {
            data: {
                title: __('Exemple de titre', 'custom-theme'),
                content: __('Ceci est un exemple de contenu pour démontrer le bloc.', 'custom-theme')
            }
        }
    },
    edit: () => {
        const blockProps = useBlockProps({
            className: 'custom-block-editor'
        });

        return (
            <div {...blockProps}>
                <div className="custom-block-placeholder">
                    <h3>{__('Bloc Personnalisé', 'custom-theme')}</h3>
                    <p>{__('Ce bloc est géré par ACF Pro. Configurez les champs dans le panneau de droite.', 'custom-theme')}</p>
                </div>
                <InnerBlocks />
            </div>
        );
    },
    save: () => {
        return <InnerBlocks.Content />;
    }
});

// JavaScript front-end pour les interactions
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.wp-block-custom-theme-custom-block');
    
    blocks.forEach(block => {
        // Animation au scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        observer.observe(block);
        
        // Interactions hover
        block.addEventListener('mouseenter', () => {
            block.classList.add('is-hovered');
        });
        
        block.addEventListener('mouseleave', () => {
            block.classList.remove('is-hovered');
        });
    });
});
