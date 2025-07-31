<?php
/**
 * Script pour activer le thème custom
 */

// Définir les constantes WordPress
define('WP_USE_THEMES', false);
require_once('wp-config.php');
require_once('wp-load.php');

// Activer le thème custom
$theme_name = 'custom-theme';

if (get_option('stylesheet') !== $theme_name) {
    switch_theme($theme_name);
    echo "Thème '$theme_name' activé avec succès!\n";
} else {
    echo "Le thème '$theme_name' est déjà actif.\n";
}

// Vérifier le status
$current_theme = wp_get_theme();
echo "Thème actuel: " . $current_theme->get('Name') . " (version " . $current_theme->get('Version') . ")\n";
echo "Répertoire du thème: " . get_stylesheet_directory() . "\n";

// Vérifier que Timber est disponible
if (class_exists('Timber\\Timber')) {
    echo "✓ Timber est disponible\n";
} else {
    echo "✗ Timber n'est pas disponible\n";
}

// Vérifier que ACF Pro est disponible
if (function_exists('acf_add_local_field_group')) {
    echo "✓ ACF Pro est disponible\n";
} else {
    echo "✗ ACF Pro n'est pas disponible\n";
}
?>
