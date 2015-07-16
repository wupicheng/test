'use strict';

// Configuring the teachers module
angular.module('teachers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?');
		Menus.addSubMenuItem('topbar', 'teachers', 'List Teachers', 'teachers');
		Menus.addSubMenuItem('topbar', 'teachers', 'New Teachers', 'teachers/create');
	}
]);