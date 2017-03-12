---
---
/**
 * Javascript code for https://www.binarysun.co.uk/
 */

/**
 * Utilities
 */

{% include_relative bs_storage.js %}

/**
 * Modules
 */

{% include_relative bs_favorites.js %}

{% include_relative bs_fullscreen.js %}

{% include_relative bs_category_filters.js %}

/**
 * Bootstrap.
 */
(function( $ ) {

	$( 'document' ).ready(
		function() {

			BS_CategoryFilters.init();
			BS_Favorites.init();
			BS_Fullscreen.init();

		}
	);

})( jQuery );
