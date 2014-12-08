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
			vm.jobs = jobFactory.jobs;
			//$scope.$apply();
		});

		function activate() {
			console.log('[ctrl-jobs] activate')
			common.activateController([jobFactory.getData()], 'submissions').
			then(function () {
				vm.jobs = jobFactory.jobs;
				console.log('[ctrl-jobs] activate..then - loaded ' + vm.jobs.length + ' jobs.');
				log('Activated Jobs View');
			});
		}
		
		function create(recruiter, company, title, description) {
			console.log('[ctrl-jobs] create')
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
			then(jobFactory.getData().
			then(function () {
				vm.jobs = jobFactory.jobs;
				vm.$apply();
			}),
			function (errors) {
				logError(error);
			});
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

		function getJobs() {
			console.log('[ctrl-jobs] getJobs')
			jobFactory.getData().
			then(function () {
				vm.jobs = jobsFactory.jobs;
				console.log('[ctrl-jobs] getJobs..then - loaded ' + vm.jobs.length + ' jobs.');
			}, function (error) {
				console.log('[ctrl-jobs] getJobs..then - error');
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
