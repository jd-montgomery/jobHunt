(function () {
	'use strict';

	angular
		.module('app')
		.controller('createActivity', createActivity);

	createActivity.$inject = ['$modal', '$scope', 'activityFactory', 'common']; 

	function createActivity($modal, $scope, activityFactory, common) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('jobDetail'),
			logError = getLogFn('jobDetail', 'error'),
			vm = this;

		vm.activities = [];
		vm.selectedActivity = undefined;
		vm.title = 'createActivity';
		activate();

		function activate() {
			activityFactory.getData().
			then(function (activities) {
				vm.activities = activities;
				vm.selectedActivity = vm.activities[0];
				$scope.$apply();
				log('Activity Types loaded.');
			});
		}
	}
})();
