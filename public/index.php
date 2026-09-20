<?php
/**
 * BBOP Single Page Application WordPress Wrapper
 *
 * @package BBOP
 */
if (!defined('ABSPATH')) {
    exit;
}

$html_file = __DIR__ . '/index.html';
if (file_exists($html_file)) {
    // Read and serve the compiled index.html
    $content = file_get_contents($html_file);
    // Replace relative assets paths if needed
    $theme_uri = get_template_directory_uri();
    $content = str_replace('href="/assets/', 'href="' . $theme_uri . '/assets/', $content);
    $content = str_replace('src="/assets/', 'src="' . $theme_uri . '/assets/', $content);
    $content = str_replace('href="/logo.png"', 'href="' . $theme_uri . '/logo.png"', $content);
    $content = str_replace('src="/logo.png"', 'src="' . $theme_uri . '/logo.png"', $content);
    $content = str_replace('src="/logo.jpg"', 'src="' . $theme_uri . '/logo.jpg"', $content);
    echo $content;
} else {
    echo '<h1>BBOP Portal</h1><p>Index file is loading...</p>';
}
