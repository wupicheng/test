'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);

//用户管理菜单设置
angular.module('users').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        //this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
        //Menus.addMenuItem('topbar', 'Exams', 'exams', 'dropdown', '/exams(/create)?',false,'user');
        Menus.addMenuItem('topbar', '账户管理', 'users', 'dropdown', '/users(/create)?',false,['admin']);
        //Menus.addSubMenuItem('topbar', 'exams', '未完成考试', 'exams');
        Menus.addSubMenuItem('topbar', 'users', '所有账户', 'users/listAllUsers',1);
        Menus.addSubMenuItem('topbar', 'users', '新建账户', 'users/create',2);

        Menus.addSubMenuItem('topbar', 'users', '', '####',3,false);
        Menus.addSubMenuItem('topbar', 'users', '所有学生', 'stus',4);
        Menus.addSubMenuItem('topbar', 'users', '添加学生', 'stus/create',5);
        Menus.addSubMenuItem('topbar', 'users', '', '####',6,false);
        Menus.addSubMenuItem('topbar', 'users', '所有教师', 'teachers',7);
        Menus.addSubMenuItem('topbar', 'users', '添加教师', 'teachers/create',8);
        Menus.addSubMenuItem('topbar', 'users', '', '####',9,false);//最后一个参数表示这是一个分割栏
        Menus.addSubMenuItem('topbar', 'users', '所有分组', 'groups',10);

        Menus.addSubMenuItem('topbar', 'users', '新建分组', 'groups/create',11);
        //Menus.addSubMenuItem('topbar', 'exams', '已结束考试', 'exams/create');
    }
]);