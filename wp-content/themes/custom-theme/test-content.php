<?php
/**
 * Page de test pour debugger le contenu
 */

$context = \Timber\Timber::context();
$context['posts'] = \Timber\Timber::get_posts(array('numberposts' => 1));

\Timber\Timber::render('test-content.twig', $context);
?>
