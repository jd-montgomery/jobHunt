(function () {
	'use strict';

	angular
		.module('app')
		.controller('jobs', jobs);

	jobs.$inject = ['$location', 'common', 'companyFactory', 'jobFactory', 'recruiterFactory']; 

	function jobs($location, common, companyFactory, jobFactory, recruiterFactory) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('submissions'),
			logError = getLogFn('app', 'error'),
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
			//TODO redirect to show details of job
		}

		function deleteJob(job) {
			log('deleted ' + job.Name);
		}

		function getCompany(companyName)
		{
			return companyFactory.getCompanies(companyName).
			then(function (companies) {
				return companies;
			}, function (error) {
				logError(error);
			});
		}

		function getRecruiter(recruiterName) {
			return recruiterFactory.getRecruiters(recruiterName).
			then(function (recruiters) {
				return recruiters;
			}, function (error) {
				logError(error);
			});
		}
	}
})();
