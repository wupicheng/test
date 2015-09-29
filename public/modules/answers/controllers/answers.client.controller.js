'use strict';

angular.module('answers').controller('AnswersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Answers',
	function($scope, $stateParams, $location, Authentication, Answers) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var answer = new Answers({
				title: this.title,
				content: this.content
			});
			answer.$save(function(response) {
				$location.path('answers/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(answer) {
			if (answer) {
				answer.$remove();

				for (var i in $scope.answers) {
					if ($scope.answers[i] === answer) {
						$scope.answers.splice(i, 1);
					}
				}
			} else {
				$scope.answer.$remove(function() {
					$location.path('answers');
				});
			}
		};

		$scope.update = function() {
			var answer = $scope.answer;

			answer.$update(function() {
				$location.path('answers/' + answer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.answers = Answers.query();
		};

		$scope.findOne = function() {
			$scope.answer = Answers.get({
				answerId: $stateParams.answerId
			});
		};
	}
]);