(function () {
	'use strict';

	angular
		.module('app')
		.factory('companyFactory', companyFactory);

	companyFactory.$inject = ['dataContext'];

	function companyFactory(dataContext) {
		var service = {
			getCompanies: getCompanies
		};

		return service;

		function getCompanies(companyName) {
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
	}
})();