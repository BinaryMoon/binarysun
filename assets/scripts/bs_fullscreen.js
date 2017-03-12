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
