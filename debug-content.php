<?php
/**
 * Script de debug pour tester le contenu des posts
 */

// Charger WordPress
define('WP_USE_THEMES', false);
require_once('wp-config.php');
require_once('wp-load.php');

// Initialiser Timber
$context = \Timber\Timber::context();
$posts = \Timber\Timber::get_posts();

echo "Debug des posts:\n";
echo "Nombre de posts: " . count($posts) . "\n\n";

if (!empty($posts)) {
    $post = $posts[0];
    echo "Titre: " . $post->title . "\n";
    echo "Contenu brut: " . $post->content . "\n";
    echo "Contenu échappé: " . htmlspecialchars($post->content) . "\n";
    echo "Type de contenu: " . gettype($post->content) . "\n";
}
?>
