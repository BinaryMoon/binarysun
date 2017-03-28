
/**
 * Methods for creating, editing, deleting, and checking browser cookies.
 */
var BS_Cookie = (function() {

	'use strict';


	/**
	 * Get the value of a cookie.
	 *
	 * @param  string key Cookie key.
	 * @return string
	 */
	var get = function( key ) {

		// Name of the key to look up.
		var name = key + '=';
		// Grab the cookie and decode it.
		var decodedCookie = decodeURIComponent( document.cookie );
		// Split the cookie into parts.
		var cookieParts = decodedCookie.split( ';' );

		// Loop through cookie parts and search for the key.
		for ( var i = 0; i < cookieParts.length; i++ ) {

			// Temp variable to store the current part.
			var part = cookieParts[i];

			// Loop through until we get to a space.
			while ( part.charAt(0) == ' ' ) {
				part = part.substring(1);
			}

			// If this is the correct cookie key then return.
			if ( 0 == part.indexOf( name ) ) {
				return part.substring( name.length, part.length );
			}

		}

		// Cookie isn't found so return empty string.
		return '';

	}


	/**
	 * Set a new cookie.
	 *
	 * @param string key      Cookie key to save.
	 * @param string value    Value of cookie
	 * @param int    duration Duration of cookie.
	 */
	var set = function( key, value, duration ) {

		// Create a new date object.
		var d = new Date();

		// Set the date object to the time of the expiration time.
		d.setTime( d.getTime() + ( duration * 24 * 60 * 60 * 1000 ) );

		// Work out expiration time based on date object.
		var expires = 'expires=' + d.toUTCString();

		// Save the cookie.
		document.cookie = key + '=' + value + ';' + expires + ';path=/';

	}


	/**
	 * Check if the specified cookie has been set or not.
	 *
	 * @param  string cookie The cookie key to check against.
	 * @return boolean
	 */
	var check = function( cookie ) {

		// Get the cookie value.
		var value = get( cookie );

		// If the value is set then return true, else return false.
		if ( value ) {

			return true;

		} else {

			return false;

		}

	}


	/**
	 * Public methods.
	 */
	return {
		get: get,
		set: set,
		check: check
	};

}());
