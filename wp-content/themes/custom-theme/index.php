<?php
/**
 * Index template
 */

$context = \Timber\Timber::context();
$posts = \Timber\Timber::get_posts();

// Appliquer manuellement les filtres WordPress à chaque post
foreach ($posts as $post) {
    $post->filtered_content = apply_filters('the_content', $post->content);
}

$context['posts'] = $posts;

\Timber\Timber::render('index.twig', $context);
