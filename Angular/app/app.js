(function () {
	'use strict';
	
	var app = angular.module('app', [
		// Angular modules 
		'ngAnimate',			// animations
		'ngRoute',				// routing
		'ngSanitize',			// sanitizes html bindings (ex: sidebar.js)

		// Custom modules 
		'common',				// common functions, logger, spinner
		'common.bootstrap',		// bootstrap dialog wrapper functions

		// 3rd Party Modules
		'breeze.angular',		// configures breeze for an angular app
		'breeze.directives',	// contains the breeze validation directive (zValidate)
		'xeditable',			// edit in place, click to edit
		'ui.bootstrap',			// ui-bootstrap (ex: carousel, pagination, dialog)
	]);
	
	// Handle routing errors and success events
	app.run(['$route', 'editableOptions', function ($route, editableOptions) {
		// Include $route to kick start the router.
		editableOptions.theme = 'bs3'; // xeditable - bootstrap3 theme. Can be also 'bs2', 'default'
	}]);
})();