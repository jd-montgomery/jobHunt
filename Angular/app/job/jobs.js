(function () {
	'use strict';

	angular
		.module('app')
		.controller('jobs', jobs);

	jobs.$inject = ['$location', '$scope', 'common', 'companyFactory', 'config', 'jobFactory', 'recruiterFactory'];

	function jobs($location, $scope, common, companyFactory, config, jobFactory, recruiterFactory) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('submissions'),
			logError = getLogFn('app', 'error'),
			vm = this;

		vm.company = '';
		vm.create = create;
		vm.description = '';
		vm.delete = deleteJob;
		vm.edit = edit;
		vm.getCompany = getCompany;
		vm.getRecruiter = getRecruiter;
		vm.jobs = [];
		vm.recruiter = '';
		vm.title = '';

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
				vm.company = '';
				vm.description = '';
				vm.recruiter = '';
				vm.title = '';
			}, function (errors) {
				logError(error);
			});
		}

		function deleteJob(job) {
			log('deleted ' + job.Name);
		}
		
		function edit(job) {
			$location.path('/jobs/' + job.Id);
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