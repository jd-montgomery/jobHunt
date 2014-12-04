(function () {
	'use strict';

	angular
		.module('app')
		.controller('submissions', submissions);

	submissions.$inject = ['$location', 'common']; 

	function submissions($location, common) {
		var getLogFn = common.logger.getLogFn,
			log = getLogFn('submissions'),
			vm = this;

		vm.title = 'Submissions';

		function activate() {
			common.activateController([], 'submissions')
				.then(function () { log('Activated Submissions View'); });
		}

		activate();
	}
})();
