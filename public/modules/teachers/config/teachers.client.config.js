'use strict';

// Configuring the teachers module
angular.module('teachers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar2', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?');
		Menus.addSubMenuItem('topbar2', 'teachers', 'List Teachers', 'teachers');
		Menus.addSubMenuItem('topbar2', 'teachers', 'New Teachers', 'teachers/create');
	}
]);