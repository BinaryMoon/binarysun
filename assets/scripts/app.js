---
---
/**
 * Javascript code for https://www.binarysun.co.uk/
 */

/**
 * Utilities
 */

{% include_relative bs_storage.js %}

{% include_relative bs_awards.js %}

/**
 * Modules
 */

{% include_relative bs_favorites.js %}

{% include_relative bs_fullscreen.js %}

{% include_relative bs_category_filters.js %}

{% include_relative bs_games_played.js %}

{% include_relative bs_time_on_site.js %}

{% include_relative bs_visits.js %}

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