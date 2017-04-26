/**
 * Do everything with the favourites.
 */
var BS_Favourites = (function() {

	'use strict';

	/**
	 * Local Storage key value for storing favourite games against.
	 *
	 * @type {String}
	 */
	var key = 'favoriteGames';


	/**
	 * CSS selector for the favourite games list.
	 *
	 * @type {String}
	 */
	var fave_games_selector = '.my-favourite-games .all-games .games-list .game';


	/**
	 * Display favourited gams on the favourites page.
	 */
	var display_favourite_games = function() {

		// Only display on "my favourites" page.
		if ( ! is_my_favourites_page() ) {
			return;
		}

		display_favourites();

		// Load saved favourites.
		var faves = get_favourites();

		// If there are no favourites then display a message saying how to
		// save them.
		if ( faves.length <= 0 ) {
			$( '.message.no-favorites' ).show();
		}

	}


	/**
	 * Is the current page the 'My Favourite Games' page?
	 *
	 * @type boolean
	 */
	var is_my_favourites_page = function() {

		return $( 'body' ).hasClass( 'my-favourite-games' );

	}


	/**
	 * Alter favourite button state so that they show whether a game has been favourited or not.
	 */
	var set_button_properties = function() {

		// Load saved favourites.
		var faves = get_favourites();

		// Loop through saved games and set any favourite buttons to display
		// whether the game is faved or not.
		for ( var i = 0; i < faves.length; i++ ) {

			set_favourite_game_status( faves[i], true );

		}

	}


	/**
	 * Setup the favourite buttons so that they will favourite a game on click.
	 */
	var setup_buttons = function() {

		// Favourite game button.
		$( 'button.fave' ).on(
			'click',
			function() {

				var $this = $( this );
				var game_id = $this.data( 'game-id' );

				// Check games current saved status.
				if ( $this.hasClass( 'favorited' ) ) {

					// Remove favourite.
					set_favourite_game_status( game_id, false );

				} else {

					// Add favourite.
					set_favourite_game_status( game_id, true );

				}

			}
		);

	}


	/**
	 * Set the status of the game button.
	 *
	 * This allows us to consistently set whether the game has been favourited or
	 * not.
	 *
	 * @param  int 	   game_id The game id
	 * @param  boolean status  true for game is favourited, false for not
	 */
	var set_favourite_game_status = function( game_id, status ) {

		var selector = '.game[data-game-id="' + game_id + '"] button';
		var $game = $( selector );

		// Check games current saved status.
		if ( status ) {

			// Add favourite.
			$game.addClass( 'favorited' );
			save_favourite( game_id );

		} else {

			// Delete favourite.
			$game.removeClass( 'favorited' );
			delete_favourite( game_id );

		}

	}


	/**
	 * Display a number in the navigation showing how many games you have favourited.
	 */
	var display_favourites_count = function() {

		var faves = get_favourites();

		if ( faves.length > 0 ) {

			// If there's some favourites then update the navigation count.
			$( 'nav .favorites .count' ).html( faves.length ).css( 'display', 'inline-block' );
			$( 'nav .favorites .count' ).animateCss( 'pulse' );

		} else {

			// If there's no favourites then hide the widget.
			$( 'nav .favorites .count' ).css( 'display', 'none' );

		}

	}

	/**
	 * Get a list of favourite game ids.
	 *
	 * @return array
	 */
	var get_favourites = function() {

		// Load the favourites.
		return BS_Storage.get_array( key );

	};


	/**
	 * Save favourite games as an array.
	 *
	 * @param  array faves array of favourite game ids.
	 */
	function save_favourites( faves ) {

		// Save the array as a json encoded string.
		BS_Storage.save_array( key, faves );

		// Update navigation favourites count.
		display_favourites_count();

		display_favourite_games();

	};


	/**
	 * Save a favourite game to local storage.
	 * Uses the game id
	 *
	 * @param  int game_id The ID of the game to save.
	 */
	var save_favourite = function( game_id ) {

		// Get current favourites.
		var faves = get_favourites();

		// If there's no favourites then initialize the array.
		if ( ! faves ) {
			faves = [];
		}

		// Add the new game to the array.
		faves.push( game_id );

		BS_Notification.create(
			'Favorite Saved',
			'',
			'fave'
		);

		// Save the favourites.
		save_favourites( faves );

	};


	/**
	 * Delete favourite game with the specified id.
	 *
	 * @param  int game_id game id to delete.
	 */
	var delete_favourite = function( game_id ) {

		// Load the existing favourites.
		var faves = get_favourites();

		// New array to store the modified favourites in.
		var new_faves = [];

		// Loop through the saves favourites and add them to the new array.
		// If the favourite is the one we want to delete then skip it.
		for ( var i = 0; i < faves.length; i++ ) {

			if ( faves[i] != game_id ) {
				new_faves.push( faves[i] );
			}

		}

		BS_Notification.create(
			'Favorite Removed',
			'',
			'fave'
		);

		// Now save the favourites.
		save_favourites( new_faves );

	};


	/**
	 * Display favourite games.
	 * Will do nothing if executed on the wrong page.
	 * Used: https://www.binarysun.co.uk/favourites/
	 *
	 * All games are available on the page by default, however they are hidden.
	 * This function shows them if they have been saved.
	 */
	var display_favourites = function() {

		// This only happens on the favourites page.
		if ( ! is_my_favourites_page() ) {
			return;
		}

		// Load the favourites.
		var faves = get_favourites();

		// If there's no favourites return. There's nothing else to do.
		if ( ! faves ) {
			return;
		}

		// Hide all games to make sure we're only showing the saved ones.
		$( fave_games_selector ).hide();

		// Loop through the favourites and set them as visible.
		for ( var i = 0; i < faves.length; i++ ) {

			var selector = fave_games_selector + '[data-game-id="' + faves[i] + '"]';
			$( selector ).show();

		}

	};


	/**
	 * Initialize favourites.
	 * This code allows a user to store their favourite games. The games get
	 * stored in localstorage and then displayed on a dedicated page.
	 */
	var init = function() {

		setup_buttons();

		set_button_properties();

		// Display the number of favourited games in the navigation.
		display_favourites_count();

		display_favourite_games();

	}


	/**
	 * Return public methods.
	 */
	return {
		init: init
	}

}());
