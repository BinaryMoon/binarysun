// javascript in here
;(function( $ ) {

	$( 'document' ).ready(
		function() {

			init_game_categories_filters();

		}
	);

	var init_game_categories_filters = function() {

		$( '.game-header .filter a' ).on(
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

})( jQuery );
