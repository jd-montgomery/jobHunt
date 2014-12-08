(function () {
	'use strict';

	angular
		.module('app')
		.factory('jobFactory', jobFactory);

	jobFactory.$inject = ['common', 'config', 'dataContext'];

	function jobFactory(common, config, dataContext) {
		var jobs = [],
			service = {
				create: create,
				getData: getData,
				jobs: jobs,
			};

		return service;

		function create(job) {
			var newJob = dataContext.createEntity('Job', job);
			return dataContext.saveChanges().
			then(function (data) {
				//service.jobs.push(data.httpResponse.data.Entities[0].Jobs[0]);
				//common.$broadcast(config.events.jobsUpdated, data.results);
				return data.results;
			}, function (data) {
				return data.entityErrors;
			});
		}

		function getData() {
			var query = dataContext.EntityQuery.from('Jobs').
				expand('Company, Recruiter');
			return dataContext.executeQuery(query).
			then(function (data) {
				service.jobs = data.results;
				common.$broadcast(config.events.jobsUpdated, data.results);
				console.log('[fact-job] [getData()] then - ' + data.results.length + ' jobs');
				return data;
			}, function (data) {
				console.log('error: ' + data);
				return data;
			});
		}
	}
})();