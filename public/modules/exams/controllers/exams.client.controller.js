'use strict';

angular.module('exams').controller('ExamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exams','Groups','Questions','Answers',
	function($scope, $stateParams, $location, Authentication, Exams,Groups,Questions,Answers) {
		$scope.authentication = Authentication;
        $scope.showSelectGroup=false;
		$scope.create = function() {
			var exam = new Exams({
				exam_name: this.exam_name,
                exam_password: this.exam_password,
                exam_admin:$scope.authentication.user.username
			});
             console.log($scope.authentication.user.username);
			exam.$save(function(response) {
				$location.path('exams/' + response._id);

				$scope.exam_name = '';
				$scope.exam_password = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(exam) {
			if (exam) {
				exam.$remove();

				for (var i in $scope.exams) {
					if ($scope.exams[i] === exam) {
						$scope.exams.splice(i, 1);
					}
				}
			} else {
				$scope.exam.$remove(function() {
					$location.path('exams');
				});
			}
		};

		$scope.update = function() {
			var exam = $scope.exam;

			exam.$update(function() {
				$location.path('exams/' + exam._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.exams = Exams.query();
		};

		$scope.findOne = function() {
			$scope.exam = Exams.get({
				examId: $stateParams.examId
			});
		};

        $scope.change_group_type=function(){


        };
//        $scope.editGroups = function () {
//            // $rootScope.theme = 'ngdialog-theme-plain custom-width';
//            $scope.xx="ssss";
//            console.log($scope);
//            ngDialog.open({
//                template: 'modules/users/views/settings/list-user-group-dialog.view.html',
//                className: 'ngdialog-theme-default',
//                controller:'ListusersController',
//                scope:$scope,
//                overlay: false
//
//            });
//        };
        $scope.editGroups=function(){
          $scope.showSelectGroup=true;

        };
        $scope.hideSelectGroup=function(){
            $scope.showSelectGroup=false;

        };

        $scope.addGroup=function(group){

            $scope.exam.exam_group.push(group);
            $scope.update();
            $scope.showSelectGroup=false;
        };
        $scope.change_group_type=function(){
            $scope.groups=  Groups.query({'group_type':$scope.group_type,'flag':'query_by_group_type'});

        };
        $scope.saveExamTime=function(){
            //alert("saveExamTime");
          //  $scope.exam.exam_time=$scope.
               $scope.update();

        };
        $scope.eventSources = [];
        $scope.uiConfig = {
            calendar:{
                height: 150,
                width:200,
                editable: true,
                header:{
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
        $scope.alertEventOnClick=function(){
            alert('ss');
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
            $scope.questionnew=questionnew;

        };

        $scope.addQuestion=function(){
            //alert( $scope.question.question_type);
            var question = new Questions({
                question_title: $scope.questionnew.question_title,
                question_desc: $scope.questionnew.question_desc,
                question_created: Date.now,
                question_choices: $scope.questionnew.question_choices,
                question_answer: $scope.questionnew.question_answer
                //question_type:$scope.questionnew.question_type
                //point: this.point._id
                //question_created:this.question_created
            });
            question.$save(function (response) {

                //$location.path('/questions/batch');
                $scope.exam.exam_questions.push(response._id);

                $scope.update();
               // $location.path('exams/' + exam._id);

                $scope.questionnew.question_title = '';
                $scope.questionnew.question_answer = '';
                $scope.questionnew.question_created = '';
                $scope.questionnew.question_choices=[];
                $scope.questionnew.question_title='';
               // $scope.questionnew.question_type='OC';
                $scope.textContent='';


            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };
        $scope.removeOne=function(id){

            for (var i in $scope.exam.exam_questions) {
                if ($scope.exam.exam_questions[i]._id === id) {
                    $scope.exam.exam_questions.splice(i, 1);
                    $scope.update();

                }
            }

        };
        $scope.dowork = function (value) {
            return  String.fromCharCode(value);
        };
        $scope.question_e_show=false;
        $scope.editQuestion=function(id){


             //console.log($event.target);

           var div_e= angular.element('#div_e');
           var div_id= angular.element('#'+id);
            //div_id.appendappend(div_e);
            div_id.after(div_e);
           // $scope.question_e_show=true;
             console.log(div_e[0].style);
             console.log(div_e.left);
        };
        $scope.update2 = function() {
            var exam = $scope.exam;

            exam.$update(function() {
                $location.path('exams');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        //完成试卷编辑  做保存
        $scope.endExamEdit=function(){
            $scope.update2();

        };
        $scope.startExam=function(exam){

            exam.exam_isstart=true;
            exam.$update(function() {
                $location.path('exams');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };
        $scope.endExam=function(exam){

            exam.exam_isstart=false;
            exam.$update(function() {
                $location.path('exams');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };


//        function cloneAll(fromObj,toObj){
//            for(var i in fromObj){
//                if(typeof fromObj === 'object'){
//                    toObj={};
//                    cloneAll(fromObj,toObj);
//                    continue;
//                }
//                toObj = fromObj;
//            }
//        }

        /////////////////////////////////////

        function clone(obj){
            var o;
            switch(typeof obj){
                case 'undefined': break;
                case 'string'   : o = obj + '';break;
                case 'number'   : o = obj - 0;break;
                case 'boolean'  : o = obj;break;
                case 'object'   :
                    if(obj === null){
                        o = null;
                    }else{
                        if(obj instanceof Array){
                            o = [];
                            for(var i = 0, len = obj.length; i < len; i++){
                                o.push(clone(obj[i]));
                            }
                        }else{
                            o = {};
                            for(var k in obj){
                                o[k] = clone(obj[k]);
                            }
                        }
                    }
                    break;
                default:
                    o = obj;break;
            }
            return o;
        }

        ///////////////////////////////////

        $scope.startAnswer=function (examId){


             var  examold=new  Exams({});
            examold= Exams.get({
                'id': examId,'questions':'a'});
            console.log(examold);

            //console.log(a);

            var answer=new Answers({
            });
            // answer= examold;
            //answer=  clone(examold);
         // var newobj=  angular.copy(examold);

//            for(var p in examold)
//            {
//                var name=p;//属性名称
//                var value=examold[p];//属性对应的值
//                answer[name]=examold[p];
//            }
            // var answer=new Answers(JSON.stringify(examold));

            //var txt=JSON.stringify(examold);

            //var examnew= JSON.parse(txt);

           //   console.log(examnew);
          //  answer=angular.copy(examold);

            //answer.exam_questions=examold.exam_questions;
//            var  examold= Exams.get({
//                examId: examId
//
//             });

          //  angular.copy(examold,answer);

            //var newObject = jQuery.extend(true, {}, examold);
           // answer=newObject;
            answer.exam=examId;
            answer.user=$scope.user;
            answer.exam_questions=examold['exam_questions'];
            console.log(answer);
            answer.$save(function(response) {
                $location.path('answers/' + response._id);

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });



        };


	}
]);