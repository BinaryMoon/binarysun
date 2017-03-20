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
	 * Display favorited gams on the favorites page.
	 */
	var display_favorite_games = function() {

		// Display favorites.
		// This only happens on the favorites page.
		// All games are available on the page by default, however they are
		// hidden. This code shows them if they have been saved.
		if ( $( 'body' ).hasClass( 'my-favourite-games' ) ) {

			display_favorites();

			// Load saved favorites.
			var faves = get_favorites();

			// If there are no favorites then display a message saying how to
			// save them.
			if ( faves.length <= 0 ) {
				$( '.message.no-favorites' ).show();
			}

		}

	}


	/**
	 * Alter favorite button state so that they show whether a game has been favorited or not.
	 */
	var set_button_properties = function() {

		// Load saved favorites.
		var faves = get_favorites();

		// Loop through saved games and set any favorite buttons to display
		// whether the game is faved or not.
		for ( var i = 0; i < faves.length; i++ ) {
			var selector = 'button[data-game-id="' + faves[i] + '"]';
			$( selector ).addClass( 'favorited' );
		}

	}


	/**
	 * Setup the favorite buttons so that they will favorite a game on click.
	 */
	var setup_buttons = function() {

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

	}


	/**
	 * Display a number in the navigation showing how many games you have favourited.
	 */
	var display_favorites_count = function() {

		var faves = get_favorites();

		if ( faves.length > 0 ) {

			// If there's some favorites then update the navigation count.
			$( 'nav .favorites .count' ).html( faves.length ).css( 'display', 'inline-block' );
			$( 'nav .favorites .count' ).animateCss( 'pulse' );

		} else {

			// If there's no favorites then hide the widget.
			$( 'nav .favorites .count' ).css( 'display', 'none' );

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


	/**
	 * Initialize favorites.
	 * This code allows a user to store their favorite games. The games get
	 * stored in localstorage and then displayed on a dedicated page.
	 */
	var init = function() {

		setup_buttons();

		set_button_properties();

		// Display the number of favorited games in the navigation.
		display_favorites_count();

		display_favorite_games();

	}


	/**
	 * Return public methods.
	 */
	return {
		init: init
	}

}());
