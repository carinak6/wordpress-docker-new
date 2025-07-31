<?php
/**
 * Configuration des champs ACF pour le bloc Hero Section
 */

if (!function_exists('acf_add_local_field_group')) {
    return;
}

acf_add_local_field_group(array(
    'key' => 'group_hero_section',
    'title' => 'Bloc Hero Section',
    'fields' => array(
        // Onglet Contenu
        array(
            'key' => 'field_hero_content_tab',
            'label' => 'Contenu',
            'name' => '',
            'type' => 'tab',
            'placement' => 'top',
        ),
        array(
            'key' => 'field_hero_title',
            'label' => 'Titre principal',
            'name' => 'title',
            'type' => 'text',
            'required' => 1,
            'placeholder' => 'Entrez le titre principal',
        ),
        array(
            'key' => 'field_hero_subtitle',
            'label' => 'Sous-titre',
            'name' => 'subtitle',
            'type' => 'text',
            'placeholder' => 'Entrez le sous-titre',
        ),
        array(
            'key' => 'field_hero_description',
            'label' => 'Description',
            'name' => 'description',
            'type' => 'wysiwyg',
            'tabs' => 'visual',
            'toolbar' => 'basic',
            'media_upload' => 0,
        ),
        
        // Onglet Boutons
        array(
            'key' => 'field_hero_buttons_tab',
            'label' => 'Boutons',
            'name' => '',
            'type' => 'tab',
            'placement' => 'top',
        ),
        array(
            'key' => 'field_hero_button_text',
            'label' => 'Texte du bouton principal',
            'name' => 'button_text',
            'type' => 'text',
            'placeholder' => 'En savoir plus',
        ),
        array(
            'key' => 'field_hero_button_url',
            'label' => 'URL du bouton principal',
            'name' => 'button_url',
            'type' => 'url',
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_hero_button_text',
                        'operator' => '!=empty',
                    ),
                ),
            ),
        ),
        array(
            'key' => 'field_hero_button_target',
            'label' => 'Cible du bouton principal',
            'name' => 'button_target',
            'type' => 'select',
            'choices' => array(
                '_self' => 'Même onglet',
                '_blank' => 'Nouvel onglet',
            ),
            'default_value' => '_self',
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_hero_button_text',
                        'operator' => '!=empty',
                    ),
                ),
            ),
        ),
        array(
            'key' => 'field_hero_secondary_button_text',
            'label' => 'Texte du bouton secondaire',
            'name' => 'secondary_button_text',
            'type' => 'text',
            'placeholder' => 'Contactez-nous',
        ),
        array(
            'key' => 'field_hero_secondary_button_url',
            'label' => 'URL du bouton secondaire',
            'name' => 'secondary_button_url',
            'type' => 'url',
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_hero_secondary_button_text',
                        'operator' => '!=empty',
                    ),
                ),
            ),
        ),
        array(
            'key' => 'field_hero_secondary_button_target',
            'label' => 'Cible du bouton secondaire',
            'name' => 'secondary_button_target',
            'type' => 'select',
            'choices' => array(
                '_self' => 'Même onglet',
                '_blank' => 'Nouvel onglet',
            ),
            'default_value' => '_self',
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_hero_secondary_button_text',
                        'operator' => '!=empty',
                    ),
                ),
            ),
        ),
        
        // Onglet Arrière-plan
        array(
            'key' => 'field_hero_background_tab',
            'label' => 'Arrière-plan',
            'name' => '',
            'type' => 'tab',
            'placement' => 'top',
        ),
        array(
            'key' => 'field_hero_background_image',
            'label' => 'Image de fond',
            'name' => 'background_image',
            'type' => 'image',
            'return_format' => 'array',
            'preview_size' => 'medium',
            'library' => 'all',
        ),
        array(
            'key' => 'field_hero_background_overlay',
            'label' => 'Couleur de superposition',
            'name' => 'background_overlay',
            'type' => 'color_picker',
            'default_value' => 'rgba(0,0,0,0.5)',
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_hero_background_image',
                        'operator' => '!=empty',
                    ),
                ),
            ),
        ),
        array(
            'key' => 'field_hero_overlay_opacity',
            'label' => 'Opacité de la superposition (%)',
            'name' => 'overlay_opacity',
            'type' => 'range',
            'min' => 0,
            'max' => 100,
            'step' => 5,
            'default_value' => 50,
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_hero_background_overlay',
                        'operator' => '!=empty',
                    ),
                ),
            ),
        ),
        
        // Onglet Style
        array(
            'key' => 'field_hero_style_tab',
            'label' => 'Style',
            'name' => '',
            'type' => 'tab',
            'placement' => 'top',
        ),
        array(
            'key' => 'field_hero_text_alignment',
            'label' => 'Alignement du texte',
            'name' => 'text_alignment',
            'type' => 'select',
            'choices' => array(
                'left' => 'Gauche',
                'center' => 'Centré',
                'right' => 'Droite',
            ),
            'default_value' => 'center',
        ),
        array(
            'key' => 'field_hero_height',
            'label' => 'Hauteur de la section',
            'name' => 'height',
            'type' => 'select',
            'choices' => array(
                'auto' => 'Automatique',
                'small' => 'Petite (60vh)',
                'medium' => 'Moyenne (80vh)',
                'large' => 'Grande (100vh)',
            ),
            'default_value' => 'medium',
        ),
    ),
    'location' => array(
        array(
            array(
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/hero-section',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'left',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
    'show_in_rest' => 1,
));
