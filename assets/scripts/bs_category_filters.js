/**
 * Setup filters on games page.
 * Used: https://www.binarysun.co.uk/games/
 */
var BS_CategoryFilters = (function() {

	/**
	 * Initialise game listing category filters.
	 * Allows users to filter games according to their desired categories.
	 */
	var init = function() {

		// Action for category filter.
		$( '.category-header .filter a' ).on(
			'click',
			function( e ) {

				e.preventDefault();

				// Set initial properties.
				var $this = $( this );
				var category = $this.data( 'category' );
				var games = $( '.games-list .game' );

				// Remove selected class from all filters, and then add to
				// selected category.
				$this.parent().find( 'a' ).removeClass( 'selected' );
				$this.addClass( 'selected' );

				// Special case if the 'All' filter is selected.
				if ( 'all' === category ) {
					games.show();
					return;
				}

				// Loop through all games.
				games.each(
					function() {

						var $this = $( this );

						// Get the categories for the current game.
						var categories = $this.data( 'categories' );

						// If the selected category is in the list of this games
						// categories then show it, else hide it.
						if ( categories.indexOf( category ) >= 0 ) {
							$this.show();
						} else {
							$this.hide();
						}
					}
				);

			}
		);

	}

	return {
		init: init
	};

}());
