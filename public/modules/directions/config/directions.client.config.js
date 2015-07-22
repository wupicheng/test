'use strict';

// Configuring the Directions module
angular.module('directions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        //Menus.addMenuItem('topbar', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?',false,['admin']);
		Menus.addMenuItem('topbar', '基础数据管理', 'basemenus', 'dropdown', '/directions(/create)?',false,['admin']);
		Menus.addSubMenuItem('topbar', 'basemenus', '所有专业', 'directions');
		Menus.addSubMenuItem('topbar', 'basemenus', '添加专业方向', 'directions/create');
        Menus.addSubMenuItem('topbar', 'basemenus', '所有课程', 'courses');
        Menus.addSubMenuItem('topbar', 'basemenus', '添加课程', 'courses/create');
	}
]);