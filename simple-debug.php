<?php
/**
 * Script simple pour tester WordPress
 */
require_once('wp-config.php');
require_once('wp-load.php');

$posts = get_posts(array('numberposts' => 5));
echo "Nombre de posts: " . count($posts) . "\n";

foreach ($posts as $post) {
    echo "- " . $post->post_title . "\n";
    echo "  Contenu: " . substr($post->post_content, 0, 100) . "...\n";
}
?>
