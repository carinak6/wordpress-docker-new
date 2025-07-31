<?php
/**
 * Theme functions
 */

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

/**
 * Initialisation de Timber
 */
if (!class_exists('Timber\\Timber')) {
    add_action('admin_notices', function() {
        echo '<div class="error"><p>Timber n\'est pas activé. Assurez-vous que Composer est installé et exécutez \'composer install\' dans le dossier du thème.</p></div>';
    });
    return;
}

// Définir les chemins des templates Timber
Timber\Timber::init();
\Timber\Timber::$dirname = array('templates', 'views');

// Configuration Twig avec le nouveau filtre (Timber 2.0+)
add_filter('timber/twig/environment/options', function($options) {
    // Désactiver complètement l'autoescape
    $options['autoescape'] = false;
    return $options;
});

/**
 * Configuration du thème
 */
class CustomTheme extends \Timber\Site {
    public function __construct() {
        parent::__construct();
        
        add_action('after_setup_theme', array($this, 'theme_supports'));
        add_action('init', array($this, 'register_blocks'));
        add_action('acf/init', array($this, 'acf_init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_filter('timber/context', array($this, 'add_to_context'));
        add_filter('timber/twig', array($this, 'add_to_twig'));
    }

    public function theme_supports() {
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');
        add_theme_support('editor-styles');
        add_theme_support('align-wide');
        add_theme_support('responsive-embeds');
        add_theme_support('wp-block-styles');
    }

    public function enqueue_assets() {
        // Styles principaux du thème
        wp_enqueue_style(
            'theme-styles',
            get_template_directory_uri() . '/style.css',
            array(),
            filemtime(get_template_directory() . '/style.css')
        );

        // Scripts principaux du thème
        wp_enqueue_script(
            'theme-scripts',
            get_template_directory_uri() . '/assets/dist/theme.js',
            array('jquery'),
            filemtime(get_template_directory() . '/assets/dist/theme.js'),
            true
        );

        // Scripts pour l'admin
        if (is_admin()) {
            wp_enqueue_script(
                'theme-admin-scripts',
                get_template_directory_uri() . '/assets/dist/admin.js',
                array('jquery'),
                filemtime(get_template_directory() . '/assets/dist/admin.js'),
                true
            );
        }

        // Variables JavaScript
        wp_localize_script('theme-scripts', 'themeData', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('theme_nonce'),
            'isAdmin' => is_admin(),
            'isCustomizer' => is_customize_preview()
        ));
    }

    public function add_to_context($context) {
        // Ajouter les menus au contexte
        $context['menu'] = Timber::get_menu('primary');
        $context['footer_menu'] = Timber::get_menu('footer');
        
        // Ajouter le site au contexte
        $context['site'] = $this;
        
        return $context;
    }

    /**
     * Filtre le contenu des posts pour appliquer les filtres WordPress
     */
    public function add_to_twig($twig) {
        // Ajouter un filtre personnalisé pour le contenu
        $twig->addFilter(new \Twig\TwigFilter('wp_content', function($content) {
            // Log pour debug
            error_log('Filtre wp_content appelé avec: ' . substr($content, 0, 100));
            
            // Appliquer les filtres WordPress
            $filtered = apply_filters('the_content', $content);
            
            error_log('Contenu filtré: ' . substr($filtered, 0, 100));
            
            return $filtered;
        }));
        
        return $twig;
    }

    public function register_blocks() {
        if (!function_exists('acf_register_block_type')) {
            add_action('admin_notices', function() {
                echo '<div class="error"><p>ACF Pro est requis pour les blocs personnalisés. Veuillez l\'installer et l\'activer.</p></div>';
            });
            return;
        }

        // Enregistrer le script du bloc
        wp_register_script(
            'custom-block-script',
            get_template_directory_uri() . '/assets/dist/blocks/custom-block.js',
            array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'),
            filemtime(get_template_directory() . '/assets/dist/blocks/custom-block.js')
        );

        // Enregistrer les styles du bloc
        wp_register_style(
            'custom-block-style',
            get_template_directory_uri() . '/assets/dist/blocks/custom-block.css',
            array(),
            filemtime(get_template_directory() . '/assets/dist/blocks/custom-block.css')
        );

        acf_register_block_type(array(
            'name'              => 'custom-block',
            'title'             => __('Bloc Personnalisé', 'custom-theme'),
            'description'       => __('Un bloc personnalisé avec ACF Pro et Timber', 'custom-theme'),
            'render_template'   => 'templates/blocks/custom-block.twig',
            'category'          => 'common',
            'icon'              => 'admin-comments',
            'keywords'          => array('custom', 'block', 'acf', 'timber'),
            'supports'          => array(
                'align'         => array('left', 'center', 'right', 'wide', 'full'),
                'anchor'        => true,
                'customClassName' => true,
                'jsx'           => true,
                'spacing'       => array(
                    'margin'    => true,
                    'padding'   => true
                )
            ),
            'example'           => array(
                'attributes' => array(
                    'mode' => 'preview',
                    'data' => array(
                        'title' => __('Exemple de titre', 'custom-theme'),
                        'content' => __('Ceci est un exemple de contenu pour démontrer le bloc personnalisé.', 'custom-theme')
                    )
                )
            ),
            'enqueue_script'    => 'custom-block-script',
            'enqueue_style'     => 'custom-block-style'
        ));
    }

    public function acf_init() {
        if (!function_exists('acf_add_local_field_group')) {
            return;
        }

        acf_add_local_field_group(array(
            'key' => 'group_custom_block',
            'title' => 'Bloc Personnalisé',
            'fields' => array(
                array(
                    'key' => 'field_title',
                    'label' => 'Titre',
                    'name' => 'title',
                    'type' => 'text',
                    'required' => true,
                ),
                array(
                    'key' => 'field_content',
                    'label' => 'Contenu',
                    'name' => 'content',
                    'type' => 'wysiwyg',
                    'tabs' => 'all',
                    'toolbar' => 'full',
                    'media_upload' => 1,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/custom-block',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => true,
            'show_in_rest' => true,
        ));
    }
}

new CustomTheme();
