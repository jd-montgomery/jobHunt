(function () {
	'use strict';

	angular
		.module('app')
		.controller('jobDetail', jobDetail);

	jobDetail.$inject = ['$routeParams', 'common', 'jobFactory']; 

	function jobDetail($routeParams, common, jobFactory) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('jobDetail'),
			logError = getLogFn('jobDetail', 'error'),
			vm = this;

		vm.hasChanges = hasChanges;
		vm.job = undefined;
		vm.message = undefined;
		vm.save = save;

		activate();

		function activate() {
			common.activateController([getJob($routeParams.jobId)], 'jobDetail').
				then(function () {
					log('Activated Job Detail View');
				});
		}

		function getJob(id) {
			return jobFactory.getJobById(id).
			then(function (data) {
				if (data.results[0]) {
					vm.message = undefined;
					vm.job = data.results[0];
				}
				else
					vm.message = 'Unable to locate a job with Id "' + id + '".';
			});
		}

		function hasChanges(job) {
			if (!job)
				return false;
			return job.entityAspect.entityState.name == 'Modified';
		}

		function save(job) {
			return jobFactory.saveChanges().
			then(function (data) {
				if (data.httpResponse.status == 200) {
					log('Saved changes successfully.');
				}
				else {
					logError('Failed to save changes.');
				}
			});
		}
	}
})();
