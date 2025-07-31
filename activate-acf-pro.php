<?php
/**
 * Script pour activer ACF Pro
 */

// Définir les constantes WordPress
define('WP_USE_THEMES', false);
require_once('wp-config.php');
require_once('wp-load.php');

// Activer le plugin ACF Pro
$plugin_path = 'advanced-custom-fields-pro/acf.php';

if (!is_plugin_active($plugin_path)) {
    $result = activate_plugin($plugin_path);
    
    if (is_wp_error($result)) {
        echo "Erreur lors de l'activation d'ACF Pro: " . $result->get_error_message() . "\n";
    } else {
        echo "ACF Pro activé avec succès!\n";
    }
} else {
    echo "ACF Pro est déjà activé.\n";
}

// Vérifier le status
if (is_plugin_active($plugin_path)) {
    echo "Status: ACF Pro est maintenant actif.\n";
} else {
    echo "Status: ACF Pro n'est pas actif.\n";
}
?>
