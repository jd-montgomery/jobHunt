(function () {
	'use strict';

	var app = angular.module('app');

	// Collect the routes
	app.constant('routes', getRoutes());
	
	// Configure the routes and route resolvers
	app.config(['$routeProvider', 'routes', routeConfigurator]);
	function routeConfigurator($routeProvider, routes) {

		routes.forEach(function (r) {
			$routeProvider.when(r.url, r.config);
		});

		$routeProvider.otherwise({ redirectTo: '/' });
	}

	// Define the routes 
	function getRoutes() {
		return [
			{
				url: '/',
				config: {
					templateUrl: 'app/dashboard/dashboard.html',
					title: 'dashboard',
					settings: {
						nav: 1,
						content: '<i class="fa fa-dashboard"></i> Dashboard'
					}
				}
			},
			{
				url: '/jobs',
				config: {
					templateUrl: 'app/job/jobs.html',
					title: 'jobs',
					settings: {
						nav: 2,
						content: '<i class="fa fa-coffee"></i> Jobs'
					}
				}
			},
			{
				url: '/jobs/:jobId',
				config: {
					templateUrl: 'app/job/jobDetail.html',
				},
			},
			{
				url: '/submissions',
				config: {
					templateUrl: 'app/submission/submissions.html',
					title: 'submissions',
					settings: {
						nav: 3,
						content: '<i class="fa fa-paper-plane-o"></i> Submissions'
					}
				}
			},
			{
				url: '/admin',
				config: {
					title: 'admin',
					templateUrl: 'app/admin/admin.html',
					settings: {
						nav: 4,
						content: '<i class="fa fa-lock"></i> Admin'
					}
				}
			}
		];
	}
})();