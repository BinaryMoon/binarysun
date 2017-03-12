
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
