// javascript in here
;(function( $ ) {

	var init_favorites = function() {

		// Favorite game.
		$( 'button.fave' ).on(
			'click',
			function() {

				var $this = $( this );
				var game_id = $this.data( 'game-id' );

				if ( $this.hasClass( 'favorited' ) ) {

					$this.removeClass( 'favorited' );
					delete_favorite( game_id );

				} else {

					$this.addClass( 'favorited' );
					save_favorite( game_id );

				}

			}
		);

		// Setup favorited buttons.
		var faves = get_favorites();

		for ( var i = 0; i < faves.length; i++ ) {
			var selector = 'button[data-game-id="' + faves[i] + '"]';
			$( selector ).addClass( 'favorited' );
		}

		// Display favorites.
		if ( $( 'body' ).hasClass( 'my-favourite-games' ) ) {

			display_favorites();

		}

	}

	var get_favorites = function() {

		return JSON.parse( localStorage.getItem( 'favoriteGames' ) );

	}

	/**
	 * Save a favorite game to local storage.
	 * Uses the game id
	 *
	 * @param  int id The ID of the game to save.
	 */
	var save_favorite = function( id ) {

		var faves = get_favorites();

		if ( ! faves ) {
			faves = [];
		}
		faves.push( id );

		save_favorites( faves );

	}

	/**
	 * Save favorite games as an array.
	 *
	 * @param  array faves array of favorite game ids.
	 */
	function save_favorites( faves ) {

		faves = unique_array( faves );

		localStorage.setItem( 'favoriteGames', JSON.stringify( faves ) );

	}


	/**
	 * Delete favorite game with the specified id.
	 *
	 * @param  int id game id to delete.
	 */
	var delete_favorite = function( id ) {

		var faves = get_favorites();
		var new_faves = [];

		for ( var i = 0; i < faves.length; i++ ) {
			if ( faves[i] != id ) {
				new_faves.push( faves[i] );
			}
		}

		save_favorites( new_faves );

	}

	/**
	 * Display favourite games.
	 * Will do nothing if executed on the wrong page.
	 */
	var display_favorites = function() {

		var faves = get_favorites();

		if ( ! faves ) {
			return;
		}

		for ( var i = 0; i < faves.length; i++ ) {

			var selector = '.my-favourite-games .all-games .games-list .game[data-game-id="' + faves[i] + '"]';
			$( selector ).show();

		}

	}

	/**
	 * Make the contents of an array unique.
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

	var init_game_categories_filters = function() {

		$( '.category-header .filter a' ).on(
			'click',
			function( e ) {

				e.preventDefault();

				var $this = $( this );
				var category = $this.data( 'category' );
				var games = $( '.games-list .game' );

				$this.parent().find( 'a' ).removeClass( 'selected' );
				$this.addClass( 'selected' );

				if ( 'all' === category ) {
					games.show();
					return;
				}

				games.each(
					function() {

						var $this = $( this );
						var categories = $this.data( 'categories' );
						$this.hide();
						if ( categories.indexOf( category ) >= 0 ) {
							$this.show();
						}
					}
				);

			}
		);

	}

	/**
	 * Switch the game between standard embedded size, and full csreen mode.
	 */
	var init_fullscreen_toggle = function() {

		$( 'button.fullscreen' ).on(
			'click',
			function( e ) {

				e.preventDefault();

				$( 'body' ).toggleClass( 'fullscreen-game' );

				// Reload iframe.
				//$( '.game-container iframe' ).attr( 'src', $( '.game-container iframe' ).attr( 'src' ) );

			}
		);

	}

	// Initialiaze everything.
	$( 'document' ).ready(
		function() {

			init_game_categories_filters();
			init_favorites();
			init_fullscreen_toggle();

		}
	);


})( jQuery );
