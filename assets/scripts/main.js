/**
 * Javascript code for https://www.binarysun.co.uk/
 */


/**
 * Local Storage Related Methods.
 */
var BS_Storage = (function() {

	'use strict';

	/**
	 * Make the contents of an array unique so that there are no duplicated
	 * values.
	 *
	 * @param array a An array that may have duplicates.
	 * @return array
	 */
	var unique_array = function( a ) {

		var seen = {};

		return a.filter(
			function( item ) {
				return seen.hasOwnProperty( item ) ? false : ( seen[item] = true );
			}
		);

	}


	/**
	 * Get a list of items stored in local storage.
	 *
	 * @param  string key Key ID for item to return.
	 * @return array
	 */
	var get_array = function( key ) {

		return JSON.parse( localStorage.getItem( key ) );

	}


	/**
	 * Save a list of data into Local Storage.
	 * Converts the data into a json string since Local Storage only keeps strings.
	 *
	 * @param  string key  Key to store the data against.
	 * @param  array data List of data to store.
	 */
	var save_array = function( key, data ) {

		// Make sure the array only contains unique info.
		data = unique_array( data );

		// Save in Local Storage.
		localStorage.setItem( key, JSON.stringify( data ) );

	}


	/**
	 * Public methods.
	 */
	return {
		get_array: get_array,
		save_array: save_array
	};

}());


/**
 * Do everything with the favorites.
 */
var BS_Favorites = (function() {

	'use strict';

	/**
	 * Local Storage key value for storing favorite games against.
	 *
	 * @type {String}
	 */
	var key = 'favoriteGames';


	/**
	 * Initialize favorites.
	 * This code allows a user to store their favorite games. The games get
	 * stored in localstorage and then displayed on a dedicated page.
	 */
	var init = function() {

		// Favorite game button.
		$( 'button.fave' ).on(
			'click',
			function() {

				var $this = $( this );
				var game_id = $this.data( 'game-id' );

				if ( $this.hasClass( 'favorited' ) ) {

					// Remove favorite.
					$this.removeClass( 'favorited' );
					delete_favorite( game_id );


				} else {

					// Add favorite.
					$this.addClass( 'favorited' );
					save_favorite( game_id );

				}

			}
		);

		// Load saved favorites.
		var faves = get_favorites();

		// Loop through saved games and set any favorite buttons to display
		// whether the game is faved or not.
		for ( var i = 0; i < faves.length; i++ ) {
			var selector = 'button[data-game-id="' + faves[i] + '"]';
			$( selector ).addClass( 'favorited' );
		}

		// Display the number of favorited games in the navigation.
		display_favorites_count()

		// Display favorites.
		// This only happens on the favorites page.
		// All games are available on the page by default, however they are
		// hidden. This code shows them if they have been saved.
		if ( $( 'body' ).hasClass( 'my-favourite-games' ) ) {

			display_favorites();

			// If there are no favorites then display a message saying how to
			// save them.
			if ( faves.length <= 0 ) {
				$( '.message.no-favorites' ).show();
			}

		}

	}


	/**
	 * Display a number in the navigation showing how many games you have favourited.
	 */
	var display_favorites_count = function() {

		var faves = get_favorites();

		if ( faves.length > 0 ) {

			// If there's some favorites then update the navigation count.
			$( 'nav .favorites .count' ).html( faves.length ).show();

		} else {

			// If there's no favorites then hide the widget.
			$( 'nav .favorites .count' ).hide();

		}

	}

	/**
	 * Get a list of favorite game ids.
	 *
	 * @return array
	 */
	var get_favorites = function() {

		// Load the favorites.
		return BS_Storage.get_array( key );

	};


	/**
	 * Save a favorite game to local storage.
	 * Uses the game id
	 *
	 * @param  int id The ID of the game to save.
	 */
	var save_favorite = function( id ) {

		// Get current favorites.
		var faves = get_favorites();

		// If there's no favorites then initialize the array.
		if ( ! faves ) {
			faves = [];
		}

		// Add the new game to the array.
		faves.push( id );

		// Save the favorites.
		save_favorites( faves );

	};


	/**
	 * Save favorite games as an array.
	 *
	 * @param  array faves array of favorite game ids.
	 */
	function save_favorites( faves ) {

		// Save the array as a json encoded string.
		BS_Storage.save_array( key, faves );

		// Update navigation favorites count.
		display_favorites_count();

	};


	/**
	 * Delete favorite game with the specified id.
	 *
	 * @param  int id game id to delete.
	 */
	var delete_favorite = function( id ) {

		// Load the existing favorites.
		var faves = get_favorites();

		// New array to store the modified favorites in.
		var new_faves = [];

		// Loop through the saves favorites and add them to the new array.
		// If the favorite is the one we want to delete then skip it.
		for ( var i = 0; i < faves.length; i++ ) {
			if ( faves[i] != id ) {
				new_faves.push( faves[i] );
			}
		}

		// Now save the favorites.
		save_favorites( new_faves );

	};


	/**
	 * Display favourite games.
	 * Will do nothing if executed on the wrong page.
	 * Used: https://www.binarysun.co.uk/favourites/
	 */
	var display_favorites = function() {

		// Load the favorites.
		var faves = get_favorites();

		// If there's no favorites return. There's nothing else to do.
		if ( ! faves ) {
			return;
		}

		// Loop through the favorites and set them as visible.
		for ( var i = 0; i < faves.length; i++ ) {

			var selector = '.my-favourite-games .all-games .games-list .game[data-game-id="' + faves[i] + '"]';
			$( selector ).show();

		}

	};

	return {
		init: init
	}

}());

/**
 * Switch the game between standard embedded size, and full screen mode.
 */
var BS_Fullscreen = (function() {

	'use strict';

	/**
	 * Initialise Fullscreen code.
	 * Adds action to fullscreen button.
	 */
	var init = function() {

		// When a user clicks the fullscreen button toggle the body class.
		// Then use css to change the size of the game.
		$( 'button.fullscreen' ).on(
			'click',
			function( e ) {

				e.preventDefault();

				$( 'body' ).toggleClass( 'fullscreen-game' );

			}
		);

	}

	return {
		init: init
	};

}());


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
