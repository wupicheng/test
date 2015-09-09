<body ng-app="fileUpload" ng-controller="MyCtrl">
  <h4>Upload on file select</h4>
  <button ngf-select="uploadFiles($files)" multiple
          accept="image/*" ngf-max-height="1000" ngf-max-size="1MB">
      Select Files</button>
  <br><br>
  Files:
  <ul>
    <li ng-repeat="f in files" style="font:smaller">{{f.name}} {{f.$error}} {{f.$errorParam}}
      <span class="progress" ng-show="f.progress >= 0">
        <div style="width:{{f.progress}}%"
            ng-bind="f.progress + '%'"></div>
      </span>
    </li>
  </ul>
  {{errorMsg}}
</body>

//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadFiles = function(files) {
        $scope.files = files;
        angular.forEach(files, function(file) {
            if (file && !file.$error) {
         		file.upload = Upload.upload({
                  url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                  file: file
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                  });
                }, function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 *
                                           evt.loaded / evt.total));
                });
    		}
        });
    }
}]);