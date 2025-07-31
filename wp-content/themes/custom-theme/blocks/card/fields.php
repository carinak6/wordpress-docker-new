<?php
acf_add_local_field_group(array(
    'key' => 'group_card',
    'title' => 'Carte',
    'fields' => array(
        array(
            'key' => 'field_card_image',
            'label' => 'Image',
            'name' => 'image',
            'type' => 'image',
            'return_format' => 'array',
            'preview_size' => 'medium',
            'library' => 'all',
        ),
        array(
            'key' => 'field_card_title',
            'label' => 'Titre',
            'name' => 'title',
            'type' => 'text',
            'required' => true,
            'default_value' => 'Titre de la carte',
        ),
        array(
            'key' => 'field_card_subtitle',
            'label' => 'Sous-titre',
            'name' => 'subtitle',
            'type' => 'text',
        ),
        array(
            'key' => 'field_card_content',
            'label' => 'Contenu',
            'name' => 'content',
            'type' => 'textarea',
            'rows' => 4,
        ),
        array(
            'key' => 'field_card_button_text',
            'label' => 'Texte du bouton',
            'name' => 'button_text',
            'type' => 'text',
            'default_value' => 'En savoir plus',
        ),
        array(
            'key' => 'field_card_button_link',
            'label' => 'Lien du bouton',
            'name' => 'button_link',
            'type' => 'url',
        ),
        array(
            'key' => 'field_card_style',
            'label' => 'Style de la carte',
            'name' => 'style',
            'type' => 'select',
            'choices' => array(
                'default' => 'Par défaut',
                'bordered' => 'Avec bordure',
                'shadow' => 'Avec ombre',
                'flat' => 'Plate',
            ),
            'default_value' => 'default',
        ),
    ),
    'location' => array(
        array(
            array(
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/card',
            ),
        ),
    ),
));
