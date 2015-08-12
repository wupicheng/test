'use strict';

// Configuring the Directions module
angular.module('directions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        //Menus.addMenuItem('topbar', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?',false,['admin']);
		Menus.addMenuItem('topbar', '基础数据管理', 'basemenus', 'dropdown', '/directions(/create)?',false,['admin']);
		Menus.addSubMenuItem('topbar', 'basemenus', '所有专业', 'directions',1);
		Menus.addSubMenuItem('topbar', 'basemenus', '添加专业方向', 'directions/create',2);
        Menus.addSubMenuItem('topbar', 'basemenus', '', '####',3,false);
        Menus.addSubMenuItem('topbar', 'basemenus', '所有课程', 'courses',4);
        Menus.addSubMenuItem('topbar', 'basemenus', '添加课程', 'courses/create',5);
        Menus.addSubMenuItem('topbar', 'basemenus',      '',          '####',  6,false);
        Menus.addSubMenuItem('topbar', 'basemenus', '所有知识点', 'points',7);
        Menus.addSubMenuItem('topbar', 'basemenus', '添加知识点', 'points/create',8);
	}
]);