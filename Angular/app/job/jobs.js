(function () {
	'use strict';

	angular
		.module('app')
		.controller('jobs', jobs);

	jobs.$inject = ['$location', 'common', 'dataContext', 'jobFactory']; 

	function jobs($location, common, dataContext, jobFactory) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('submissions'),
			vm = this;

		vm.company = undefined;
		vm.create = create;
		vm.delete = deleteJob;
		vm.getCompany = getCompany;
		vm.getRecruiter = getRecruiter;
		vm.jobs = [];
		vm.recruiter = undefined;
		vm.title = undefined;

		activate();

		function activate() {
			common.activateController([jobFactory.getData()], 'submissions').
			then(function () {
				vm.jobs = jobFactory.jobs;
				log('Activated Jobs View');
			});
		}
		
		function create(recruiter, company, title) {
			jobFactory.create(recruiter, company, title);
			//TODO change url to show details of job
		}

		function deleteJob(job) {
			log('deleted ' + job.Name);
		}

		function getCompany(companyName)
		{
			var query = dataContext.EntityQuery.from('Companies').
				where('toLower(Name)', 'contains', companyName.toLowerCase()).
				orderBy('Name');

			return dataContext.executeQuery(query).
			then(function (data) {
				return data.results;
			}, function (data) {
				console.log('error: ' + data);
				return data;
			});
		}

		function getRecruiter(recruiterName) {
			var query = dataContext.EntityQuery.from('Recruiters').
				where('toLower(Name)', 'contains', recruiterName.toLowerCase()).
				orderBy('Name');

			return dataContext.executeQuery(query).
			then(function (data) {
				return data.results;
			}, function (data) {
				console.log('error: ' + data);
				return data;
			});
		}
	}
})();
