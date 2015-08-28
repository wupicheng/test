'use strict';

module.exports = {
	app: {
		title: 'Test',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/ngDialog/ngDialog.min.css',
                'public/lib/ngDialog/ngDialog-theme-default.min.css',
                'public/lib/ngDialog/ngDialog-theme-plain.min.css',
                'public/lib/ngDialog/ngDialog-custom-width.css',
                'public/lib/fullcalendar/dist/fullcalendar.min.css',
                'public/lib/fullcalendar/dist/fullcalendar.print.css',
                'public/lib/angular-datepicker/dist/index.min.css'


			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/fullcalendar/dist/moment.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
      			'public/lib/ngDialog/ngDialog.min.js',
                'public/lib/angular-ui-calendar/src/calendar.js',
      			'public/lib/fullcalendar/dist/fullcalendar.js',
      			'public/lib/fullcalendar/dist/gcal.js',
      			'public/lib/fullcalendar/dist/lang/zh-cn.js',
      			'public/lib/fullcalendar/dist/lang/zh-cn.js',
                'public/lib/ng-file-upload/ng-file-upload-all.min.js'
//                'public/lib/angular-datepicker/dist/index.min.js'

			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};