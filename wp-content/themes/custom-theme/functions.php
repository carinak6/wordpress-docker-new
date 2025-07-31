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
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
        add_filter('timber/context', array($this, 'add_to_context'));
        add_filter('timber/twig', array($this, 'add_to_twig'));
        add_filter('block_categories_all', array($this, 'add_custom_block_categories'));
        
        // Hook pour le debug
        add_action('init', array($this, 'debug_registered_blocks'));
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
        $theme_js_file = get_template_directory() . '/assets/dist/js/theme.js';
        if (file_exists($theme_js_file)) {
            wp_enqueue_script(
                'theme-scripts',
                get_template_directory_uri() . '/assets/dist/js/theme.js',
                array(),
                filemtime($theme_js_file),
                true
            );
        }

        // Scripts pour l'admin
        if (is_admin()) {
            $admin_js_file = get_template_directory() . '/assets/dist/js/admin.js';
            if (file_exists($admin_js_file)) {
                wp_enqueue_script(
                    'theme-admin-scripts',
                    get_template_directory_uri() . '/assets/dist/js/admin.js',
                    array(),
                    filemtime($admin_js_file),
                    true
                );
            }
        }

        // Variables JavaScript
        if (wp_script_is('theme-scripts', 'enqueued')) {
            wp_localize_script('theme-scripts', 'themeData', array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('theme_nonce'),
                'isAdmin' => is_admin(),
                'isCustomizer' => is_customize_preview()
            ));
        }
    }

    public function enqueue_block_editor_assets() {
        wp_enqueue_script('custom-blocks-editor');
        wp_enqueue_style('custom-blocks-editor');
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

        // Enregistrer les assets des blocs
        $this->register_block_assets();
        
        // Charger tous les blocs du dossier blocks/
        $this->load_custom_blocks();
    }

    private function register_block_assets() {
        // Scripts généraux pour tous les blocs
        $js_blocks_editor_file = get_template_directory() . '/assets/dist/js/blocks-editor.js';
        if (file_exists($js_blocks_editor_file)) {
            wp_register_script(
                'custom-blocks-editor',
                get_template_directory_uri() . '/assets/dist/js/blocks-editor.js',
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
                filemtime($js_blocks_editor_file)
            );
        }

        $js_blocks_frontend_file = get_template_directory() . '/assets/dist/js/blocks-frontend.js';
        if (file_exists($js_blocks_frontend_file)) {
            wp_register_script(
                'custom-blocks-frontend',
                get_template_directory_uri() . '/assets/dist/js/blocks-frontend.js',
                array(),
                filemtime($js_blocks_frontend_file),
                true
            );
        }

        // Styles généraux pour tous les blocs
        $css_blocks_editor_file = get_template_directory() . '/assets/dist/css/blocks-editor.css';
        if (file_exists($css_blocks_editor_file)) {
            wp_register_style(
                'custom-blocks-editor',
                get_template_directory_uri() . '/assets/dist/css/blocks-editor.css',
                array('wp-edit-blocks'),
                filemtime($css_blocks_editor_file)
            );
        }

        $css_blocks_frontend_file = get_template_directory() . '/assets/dist/css/blocks-frontend.css';
        if (file_exists($css_blocks_frontend_file)) {
            wp_register_style(
                'custom-blocks-frontend',
                get_template_directory_uri() . '/assets/dist/css/blocks-frontend.css',
                array(),
                filemtime($css_blocks_frontend_file)
            );
        }
    }

    private function load_custom_blocks() {
        $blocks_dir = get_template_directory() . '/blocks/';
        
        if (!is_dir($blocks_dir)) {
            return;
        }

        $blocks = scandir($blocks_dir);
        foreach ($blocks as $block) {
            if ($block === '.' || $block === '..') {
                continue;
            }
            
            $block_path = $blocks_dir . $block;
            $config_file = $block_path . '/block.json';
            
            if (is_dir($block_path) && file_exists($config_file)) {
                $this->register_single_block($block, $config_file);
            }
        }
    }

    private function register_single_block($block_name, $config_file) {
        $config = json_decode(file_get_contents($config_file), true);
        
        if (!$config) {
            return;
        }

        // Charger les champs ACF si le fichier existe
        $fields_file = dirname($config_file) . '/fields.php';
        if (file_exists($fields_file)) {
            require_once $fields_file;
        }

        // Valeurs par défaut
        $defaults = array(
            'name' => $block_name,
            'title' => ucfirst(str_replace('-', ' ', $block_name)),
            'description' => 'Bloc personnalisé ' . $block_name,
            'category' => 'custom-blocks',
            'icon' => 'admin-generic',
            'keywords' => array($block_name, 'custom'),
            'supports' => array(
                'align' => array('left', 'center', 'right', 'wide', 'full'),
                'anchor' => true,
                'customClassName' => true,
                'spacing' => array(
                    'margin' => true,
                    'padding' => true
                )
            ),
            'render_template' => 'blocks/' . $block_name . '/' . $block_name . '.twig',
            'render_callback' => array($this, 'render_block_with_timber')
        );

        $block_config = array_merge($defaults, $config);
        $block_config['render_template'] = get_template_directory() . '/blocks/' . $block_name . '/' . $block_name . '.twig';
        
        // Chercher UNIQUEMENT les assets compilés (générés depuis les dossiers des blocs)
        $js_file_compiled = get_template_directory() . '/assets/dist/js/blocks/' . $block_name . '.js';
        $css_file_compiled = get_template_directory() . '/assets/dist/css/blocks/' . $block_name . '.css';
        
        // Enqueue JS si le fichier compilé existe
        if (file_exists($js_file_compiled)) {
            wp_register_script(
                'block-' . $block_name . '-script',
                get_template_directory_uri() . '/assets/dist/js/blocks/' . $block_name . '.js',
                array('custom-blocks-frontend'),
                filemtime($js_file_compiled),
                true
            );
            $block_config['enqueue_script'] = 'block-' . $block_name . '-script';
        }
        
        // Enqueue CSS si le fichier compilé existe
        if (file_exists($css_file_compiled)) {
            wp_register_style(
                'block-' . $block_name . '-style',
                get_template_directory_uri() . '/assets/dist/css/blocks/' . $block_name . '.css',
                array('custom-blocks-frontend'),
                filemtime($css_file_compiled)
            );
            $block_config['enqueue_style'] = 'block-' . $block_name . '-style';
        }

        acf_register_block_type($block_config);
    }

    /**
     * Render callback pour les blocs avec Timber
     */
    public function render_block_with_timber($block, $content = '', $is_preview = false, $post_id = 0) {
        // Obtenir le nom du bloc sans le préfixe acf/
        $block_name = str_replace('acf/', '', $block['name']);
        
        // Chemin du template
        $template_path = 'blocks/' . $block_name . '/' . $block_name . '.twig';
        
        // Préparer le contexte
        $context = Timber::context();
        $context['block'] = $block;
        $context['fields'] = get_fields();
        $context['is_preview'] = $is_preview;
        $context['post_id'] = $post_id;
        
        // Ajouter des classes CSS basées sur les paramètres du bloc
        $classes = array();
        $classes[] = 'block-' . $block_name;
        
        if (!empty($block['className'])) {
            $classes[] = $block['className'];
        }
        
        if (!empty($block['align'])) {
            $classes[] = 'align' . $block['align'];
        }
        
        // Gérer les styles personnalisés
        if (!empty($context['fields']['text_alignment'])) {
            $classes[] = $block_name . '--align-' . $context['fields']['text_alignment'];
        }
        
        if (!empty($context['fields']['height'])) {
            $classes[] = $block_name . '--height-' . $context['fields']['height'];
        }
        
        $context['block']['classes'] = implode(' ', $classes);
        
        // Rendre le template
        Timber::render($template_path, $context);
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

    public function add_custom_block_categories($categories) {
        return array_merge(
            array(
                array(
                    'slug'  => 'custom-blocks',
                    'title' => __('Blocs Personnalisés', 'custom-theme'),
                    'icon'  => 'admin-generic',
                ),
            ),
            $categories
        );
    }

    /**
     * Debug pour vérifier l'enregistrement des blocs
     */
    public function debug_registered_blocks() {
        if (current_user_can('manage_options') && isset($_GET['debug_blocks'])) {
            echo '<pre>';
            echo "Blocs ACF enregistrés:\n";
            
            if (function_exists('acf_get_block_types')) {
                $block_types = acf_get_block_types();
                if (empty($block_types)) {
                    echo "Aucun bloc ACF trouvé!\n";
                } else {
                    foreach ($block_types as $block_type) {
                        echo "- " . $block_type['name'] . " : " . $block_type['title'] . "\n";
                    }
                }
            } else {
                echo "ACF Pro n'est pas installé ou acf_get_block_types() n'existe pas\n";
            }
            
            echo "\nDossier blocks existe: " . (is_dir(get_template_directory() . '/blocks/') ? 'OUI' : 'NON') . "\n";
            echo "Fichiers dans blocks/:\n";
            if (is_dir(get_template_directory() . '/blocks/')) {
                $blocks = scandir(get_template_directory() . '/blocks/');
                foreach ($blocks as $block) {
                    if ($block !== '.' && $block !== '..') {
                        echo "  - $block\n";
                    }
                }
            }
            echo '</pre>';
            wp_die();
        }
    }
}

new CustomTheme();
