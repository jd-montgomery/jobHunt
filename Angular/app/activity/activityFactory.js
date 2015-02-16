(function () {
	'use strict';

	angular
		.module('app')
		.factory('activityFactory', activityFactory);

	activityFactory.$inject = ['dataContext'];

	function activityFactory(dataContext) {
		var activities = [],
			service = {
				activities: activities,
				getData: getData,
			};

		return service;

		function getData() {
			var query = dataContext.EntityQuery.from('ActivityTypes');

			return dataContext.executeQuery(query).
			then(function (data) {
				service.activities = data.results;
				return data.results;
			});
		}
	}
})();