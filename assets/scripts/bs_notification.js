/**
 * Switch the game between standard embedded size, and full screen mode.
 */
var BS_Notification = (function() {

	'use strict';

	/**
	 * Classname for notification container element.
	 *
	 * @type {String}
	 */
	var notification_container = '.notification_container';


	/**
	 * Number of milliseconds to display notifications.
	 *
	 * @type {Number}
	 */
	var notification_duration = 4000;


	/**
	 * Create a new notification
	 *
	 * @param  string title       Notification title - displayed in bold.
	 * @param  string description Notification description - for extra information.
	 * @param  string icon        CSS class to display icon. Needs title text set.
	 */
	var create = function( title, description, icon ) {

		// Set the default notification header class.
		var notification_header_class = 'header';

		// Start a new notification div.
		var notification_html = '<div class="notification">';

		// If there's an icon specified then add it to the notification class list.
		// For the icon to show a title must be set.
		if ( icon.length ) {

			notification_header_class += ' icon ' + icon;

		}

		// If there's a title then add it to the notification.
		if ( title.length ) {

			notification_html += '<span class="' + notification_header_class + '">' + title + '</span>';

		}

		// If there's a description then add it to the notification.
		if ( description.length ) {

			notification_html += '<span class="description">' + description + '</span>';

		}

		// Close the notification div.
		notification_html += '</div>';

		// Append the notification to the notification container.
		// What a mess this is! :)
		$( notification_html )
			.appendTo( notification_container )
			.hide()
			.fadeIn()
			.delay( notification_duration )
			.slideUp(
				200,
				function() {
					$( this ).remove();
				}
			);

	}


	/**
	 * Initialize Notification system
	 */
	var init = function() {

		$( 'body' ).append( '<div class="notification_container"></div>' );

	}


	/**
	 * Return public methods.
	 */
	return {
		init: init,
		create: create
	};

}());
