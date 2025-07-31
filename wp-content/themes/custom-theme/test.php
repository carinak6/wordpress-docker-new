<?php
require_once __DIR__ . '/vendor/autoload.php';

use Timber\Timber;

// Test simple
$hello = 'Hello Timber';
$context = Timber::context();
$context['hello'] = $hello;

// Vérifions si Timber est installé
if (!class_exists('Timber')) {
    echo 'Timber n\'est pas installé. Vérifiez l\'installation de Composer.';
    error_log('Timber n\'est pas installé');
    return;
}

try {
    Timber::render('test.twig', $context);
} catch (Exception $e) {
    echo 'Erreur : ' . $e->getMessage();
    error_log('Erreur Timber : ' . $e->getMessage());
}
