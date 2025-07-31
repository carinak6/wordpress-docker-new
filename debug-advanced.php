<?php
/**
 * Debug avancé du contenu des posts
 */
require_once('wp-config.php');
require_once('wp-load.php');

$posts = get_posts(array('numberposts' => 1));

if (!empty($posts)) {
    $post = $posts[0];
    echo "=== DEBUG POST ===\n";
    echo "ID: " . $post->ID . "\n";
    echo "Titre: " . $post->post_title . "\n";
    echo "Status: " . $post->post_status . "\n";
    echo "Type: " . $post->post_type . "\n";
    echo "\n=== CONTENU BRUT (post_content) ===\n";
    var_dump($post->post_content);
    echo "\n=== CONTENU AVEC apply_filters ===\n";
    $filtered = apply_filters('the_content', $post->post_content);
    var_dump($filtered);
    echo "\n=== CONTENU HTML ENTITIES DECODÉ ===\n";
    var_dump(html_entity_decode($post->post_content));
    echo "\n=== TEST wp_strip_all_tags ===\n";
    var_dump(wp_strip_all_tags($post->post_content));
}
?>
