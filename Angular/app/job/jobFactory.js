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
				getJobById: getJobById,
				jobs: jobs,
				saveChanges: saveChanges,
			};

		return service;

		function create(job) {
			var newJob = dataContext.createEntity('Job', job);
			return dataContext.saveChanges().
			then(function () {
				service.getData();
			});
		};

		function getData() {
			var query = dataContext.EntityQuery.from('Jobs').
				expand('Company, Recruiter');
			return dataContext.executeQuery(query).
			then(function (data) {
				service.jobs = data.results;
				common.$broadcast(config.events.jobsUpdated, data.results);
				return data;
			}, function (data) {
				console.log('error: ' + data);
				return data;
			});
		}

		function getJobById(id) {
			var query = dataContext.EntityQuery.from('Jobs').
			where('Id', 'eq', id);
			return dataContext.executeQuery(query).
			then(function (data) {
				return data;
			});
		}

		function saveChanges() {
			return dataContext.saveChanges();
		}
	}
})();