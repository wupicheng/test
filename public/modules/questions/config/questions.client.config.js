'use strict';

// Configuring the Directions module
angular.module('questions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        //Menus.addMenuItem('topbar', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?',false,['admin']);
        Menus.addMenuItem('topbar', '试题管理', 'questionmenus', 'dropdown', '/questions(/create)?',false,['admin']);
        Menus.addSubMenuItem('topbar', 'questionmenus', '所有试题', 'questions');
        Menus.addSubMenuItem('topbar', 'questionmenus', '添加试题', 'questions/create');
        Menus.addSubMenuItem('topbar', 'questionmenus', '批量导入试题', 'questions/batch');


    }
]);