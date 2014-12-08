(function () {
	'use strict';

	var serviceId = 'dataContext';
	angular.module('app').factory(serviceId, ['common', 'config', dataContext]);

	function dataContext(common, config) {
		// Set convenience variables with commonly used Breeze query classes 
		var EntityQuery = breeze.EntityQuery;
		var FilterQueryOp = breeze.FilterQueryOp;
		var Predicate = breeze.Predicate;

		// create a manager to execute queries
		var manager = new breeze.EntityManager(config.remoteServiceUri);

		var $q = common.$q;

		var service = {
			createEntity: createEntity,
			executeQuery: executeQuery,
			EntityQuery: EntityQuery,
			FilterQueryOp: FilterQueryOp,
			getPeople: getPeople,
			getMessageCount: getMessageCount,
			Predicate: Predicate,
			saveChanges: saveChanges,
		};

		return service;

		function createEntity(entityName, entity) {
			return manager.createEntity(entityName, entity);
		}

		function executeQuery(breezeQuery) {
			return manager.executeQuery(breezeQuery);
		};

		function getMessageCount() { return $q.when(72); }

		function getPeople() {
			var people = [
				{ firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
				{ firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
				{ firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
				{ firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
				{ firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
				{ firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
				{ firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
			];
			return $q.when(people);
		}

		function saveChanges() {
			return manager.saveChanges();
		}
	}
})();