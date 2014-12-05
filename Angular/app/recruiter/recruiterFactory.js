(function () {
	'use strict';

	angular
		.module('app')
		.factory('recruiterFactory', recruiterFactory);

	recruiterFactory.$inject = ['dataContext'];

	function recruiterFactory(dataContext) {
		var service = {
			getRecruiters: getRecruiters
		};

		return service;

		function getRecruiters(recruiterName) {
			var query = dataContext.EntityQuery.from('Recruiters').
				where('toLower(Name)', 'contains', recruiterName.toLowerCase()).
				orderBy('Name');

			return dataContext.executeQuery(query).
			then(function (data) {
				return data.results;
			}, function (data) {
				console.log('error getting recruiter ' + data);
				return data;
			});
		}
	}
})();