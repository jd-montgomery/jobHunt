(function () {
	'use strict';

	angular
		.module('app')
		.controller('jobDetail', jobDetail);

	jobDetail.$inject = ['$modal', '$routeParams', 'common', 'jobFactory']; 

	function jobDetail($modal, $routeParams, common, jobFactory) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('jobDetail'),
			logError = getLogFn('jobDetail', 'error'),
			vm = this;

		vm.descriptionButtonText = 'Show Description';
		vm.enterActivity = enterActivity;
		vm.hasChanges = hasChanges;
		vm.job = undefined;
		vm.map = {
		  zoom: 11,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		vm.map.options = { scrollwheel: false };
		vm.message = undefined;
		vm.save = save;
		vm.showHideDescription = showHideDescription;

		activate();

		function activate() { 
			common.activateController([getJob($routeParams.jobId)], 'jobDetail').
				then(function () {
					if (vm.job.Company.AddressOne)
						codeAddress(vm.job.Company.AddressOne + ' ' + vm.job.Company.AddressTwo);

					log('Activated Job Detail View');
				});
		}

		function codeAddress(address) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address': address
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					vm.map.center = results[0].geometry.location;
					var map = new google.maps.Map(document.getElementById("googleMap"), vm.map);

					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
				}
			});
		}

		function enterActivity(job) {
			//TODO open modal to enter activity record
			var modal = $modal.open({
				templateUrl: '/app/activity/create.html',
				windowClass: 'full'
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

		function showHideDescription() {
			if (vm.descriptionButtonText == 'Show Description')
				vm.descriptionButtonText = 'Hide Description';
			else
				vm.descriptionButtonText = 'Show Description';
		}
	}
})();
