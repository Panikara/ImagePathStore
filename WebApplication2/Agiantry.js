/// <reference path="C:\Users\spuser.VTSLINDIA\documents\visual studio 2015\Projects\WebApplication2\WebApplication2\scripts/angular.js" />
var app = angular.module("mainPage", ['ngRoute'])
.controller("AllInfoController", function ($scope, $http) {
    alert("All");
    $http.get("Home/AllDetails").then(function (response) {
        $scope.AllInfo = response.data;
        console.log($scope.AllInfo);
    })
})
.controller("OneRecordController", function ($scope, $http, $routeParams) {
    alert("One");
    $http({
        url: "Home/OneRecord",
        params: { id: $routeParams.id },
        method: "get"
    })
   .then(function (response) {
       $scope.OneInfo = response.data;
       console.log($scope.OneInfo);

   })
});
app.config(function ($routeProvider) {
    $routeProvider
    .when("/AllRecords", {
        templateUrl: "AllRecords.html",
        controller: "AllInfoController"

    })
    .when("/OneRecord/:id", {
        templateUrl: "OneRecord.html",
        controller: "OneRecordController"
    })
})

var app = angular.module("upload", ['ngFileUpload']).controller("myfile", function ($scope, $http, Upload) {
   
    $scope.SelectFile = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.PreviewImage = e.target.result;

            $scope.$apply();
        };

        reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files[0]);
    };


    $scope.UploadFiles = function (files) {
        alert(files)
        console.log(files);
        debugger;
        $scope.SelectedFiles = files;
        console.log($scope.SelectedFiles);

        if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
            Upload.upload({
                url: 'Home/UploadFiles',
                data: {
                    files: $scope.SelectedFiles
                }
            })
        }
    }

            $scope.save = function () {
                $http.get("Home/GetAllInfo").then(function (response) {
                    $scope.GetAllInfo = response.data;
                    console.log($scope.GetAllInfo);
                })
            }
        
    

     
})
