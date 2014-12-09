(function () {
	'use strict';

	angular
		.module('app')
		.controller('jobs', jobs);

	jobs.$inject = ['$scope', 'common', 'companyFactory', 'config', 'jobFactory', 'recruiterFactory'];

	function jobs($scope, common, companyFactory, config, jobFactory, recruiterFactory) {
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

		common.$rootScope.$on(config.events.jobsUpdated, function (event, jobs) {
			vm.jobs = jobs;
			$scope.$apply();
		});

		function activate() {
			common.activateController([jobFactory.getData()], 'jobs').
			then(function () {
				vm.jobs = jobFactory.jobs;
				log('Activated Jobs View');
			});
		}
		
		function create(recruiter, company, title, description) {
			var job = {
				Recruiter: {
					Name: recruiter
				},
				Company: {
					Name: company
				},
				Name: title,
				Description: description
			};

			jobFactory.create(job).
			then(function () {
				log('Created new job');
			}, function (errors) {
				logError(error);
			});
		}

		function deleteJob(job) {
			log('deleted ' + job.Name);
		}

		function getCompany(companyName) {
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