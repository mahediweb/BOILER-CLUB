<?php
/**
 * BBOP Theme Functions and Definitions
 *
 * @package BBOP
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function bbop_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'bbop_theme_setup');

// Disable WordPress default admin bar on frontend to ensure full React layout compatibility
add_filter('show_admin_bar', '__return_false');
