'use strict';

angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions','Directions','Courses','Points','Choices',
	function($scope, $stateParams, $location, Authentication, Questions,Directions,Courses,Points,Choices) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            // alert(this.question_name);
            var question = new Questions({
                question_title: this.question_title,
                question_desc: this.question_desc,
                question_created: Date.now,
                question_choices: this.question_choices,
                question_answer: this.question_answer,
                point: this.point._id
                //question_created:this.question_created
            });
            question.$save(function (response) {
                $location.path('questions/' + response._id);

                $scope.question_title = '';
                $scope.question_answer = '';
                $scope.question_created = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (question) {
            if (question) {
                question.$remove();

                for (var i in $scope.questions) {
                    if ($scope.questions[i] === question) {
                        $scope.questions.splice(i, 1);
                    }
                }
            } else {
                $scope.question.$remove(function () {
                    $location.path('questions');
                });
            }
        };
        $scope.removeBatchOne = function (questionId) {
            if (questionId) {
                Questions.remove({questionId:questionId,flag:'d2'});

                for (var i in $scope.questions) {
                    if ($scope.questions[i]._id === questionId) {
                        $scope.questions.splice(i, 1);
                    }
                }
            } else {
                $scope.question.$remove(function () {
                    $location.path('questions');
                });
            }
        };

        $scope.update = function () {
            var question = $scope.question;

            question.$update(function () {
                $location.path('questions/' + question._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.update2 = function () {
            var question = $scope.question;
           var  examId=$scope.examId;
            question.$update(function () {
                $location.path('exams/' + examId);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.questions = Questions.query();
        };

        $scope.findOne = function () {
            $scope.question = Questions.get({
                questionId: $stateParams.questionId
            });
        };
        $scope.examId='';
        $scope.findOne2 = function () {
            $scope.question = Questions.get({
                questionId: $stateParams.questionId
            });
            $scope.examId=$stateParams.examId;
            console.log($stateParams);
        };
        $scope.findOneEdit = function () {
            $scope.directions = Directions.query();
            $scope.question = Questions.get({
                questionId: $stateParams.questionId
            }, function () {
                $scope.courses = Courses.query({directionId: $scope.question.course.direction, flag: 'q2'}, function () {
                    for (var i in  $scope.courses) {

                        if ($scope.question.course._id === $scope.courses[i]._id) {

                            $scope.course = $scope.courses[i];
                        }
                    }
                });


                $scope.directions = Directions.query(function () {
                    //alert( 'from questions client controller...$scope.question.course.direction='+JSON.stringify($scope.question.course));
                    for (var i in  $scope.directions) {

                        if ($scope.question.course.direction === $scope.directions[i]._id) {

                            $scope.direction = $scope.directions[i];
                        }
                    }

                });

            });
        };
        $scope.findBatch=function(){

            $scope.question=new Questions();
            $scope.question.question_choices=[];
            $scope.question.question_title='';
            $scope.question.question_type='OC';
        };
        $scope.changeDirection = function () {
            //alert('sss');
            $scope.courses = Courses.query({directionId: $scope.direction._id, flag: 'q2'});
            //$scope.courses=Courses2.query({directionId:$scope.direction._id,flag:'q2'});

        };
        $scope.changeCourse = function () {
            //alert('changeCourse');
            $scope.points = Points.query({courseId: $scope.course._id, flag: 'q3'});
            //$scope.courses=Courses2.query({directionId:$scope.direction._id,flag:'q2'});

        };

        $scope.initdirection = function () {
            $scope.directions = Directions.query();
            $scope.question_choices =[];

        };
        $scope.addchoice = function () {
            //choice.title=this.choice_title;
            var choice = {title: this.choice_title, istrue: false};

//          var  choice.title=this.choice_title;
//            choice.istrue='';
//            var choice = new Choices({
//                choice_title:this.choice_title,
//                chaoice_num:this.question_choices.length+1
//            });
            $scope.question.question_choices.push(choice);
            //alert($scope.question_choices);
        };

        $scope.xx = function () {
            alert(JSON.stringify($scope.question_choices));

        };
        $scope.dowork = function (value) {
            return  String.fromCharCode(value);
        };
        $scope.check = function () {
            var o = $scope.textContent;
            var arrays = o.split('\n');
            //alert(arrays);
            var choices = [];
            for (var n = 1; n < arrays.length; n++) {
                choices.push({title: arrays[n], istrue: false});
            }

            var questionnew = new Questions({
                question_title: arrays[0],
                question_choices: choices

            });
            $scope.question=questionnew;

        };
        $scope.batch=function(){

            $scope.question=new Questions();
        };

        $scope.addQuestion=function(){
           alert( $scope.question.question_type);
            var question = new Questions({
                question_title: $scope.question.question_title,
                question_desc: $scope.question.question_desc,
                question_created: Date.now,
                question_choices: $scope.question.question_choices,
                question_answer: $scope.question.question_answer,
                question_type:$scope.question.question_type
                //point: this.point._id
                //question_created:this.question_created
            });
            question.$save(function (response) {
                $location.path('/questions/batch');

                $scope.question.question_title = '';
                $scope.question.question_answer = '';
                $scope.question.question_created = '';
                $scope.question.question_choices=[];
                $scope.question.question_title='';
                $scope.question.question_type='OC';
                $scope.textContent='';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

    }
]);