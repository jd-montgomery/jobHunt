(function () {
	'use strict';

	angular
		.module('app')
		.factory('jobFactory', jobFactory);

	jobFactory.$inject = ['$http', 'dataContext'];

	function jobFactory($http, dataContext) {
		var jobs = [],
			service = {
				getData: getData,
				jobs: jobs,
			};

		return service;

		function getData() {
			var query = dataContext.EntityQuery.from('Jobs').
				expand('Company, Recruiter');
			return dataContext.executeQuery(query).
			then(function (data) {
				service.jobs = data.results;
				return data;
			}, function (data) {
				console.log('error: ' + data);
				return data;
			});
		}
	}
})();