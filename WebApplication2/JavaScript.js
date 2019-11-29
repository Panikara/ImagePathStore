/// <reference path="C:\Users\spuser.VTSLINDIA\Documents\Visual Studio 2015\Projects\WebApplicationES\WebApplicationES\scripts/angular.min.js" />
var varMyDirectivesApplication = angular.module("myDirectivesApplication", []);

varMyDirectivesApplication.directive("dropdownMultiselect", function () {
    return {
        restrict: "E",
        scope: {
            model: "=",
            options: "="
        },
        template:
          "<div class='btn-group' data-ng-class='{open: open}'>" +
          "<button class='btn btn-small' data-ng-click='openDropdown()'>Select...</button>" +
          "<button class='btn btn-small dropdown-toggle' data-ng-click='openDropdown()'> <span class='caret'></span></button>" +
          "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +

          "<li data-ng-repeat='option in options'> <a data-ng-click='toggleSelectItem(option)'>{{option.name}}</a></li>" +
          "</ul>" +
          "</div>",

        controller: function ($scope) {
            $scope.openDropdown = function () {
                alert("Yes");
                $scope.open = !$scope.open;
            };


            $scope.toggleSelectItem = function (option) {
                var intIndex = -1;
                angular.forEach($scope.model, function (item, index) {
                    if (item.Id == option.Id) {
                        intIndex = index;
                    }
                });

                if (intIndex >= 0) {
                    $scope.model.splice(intIndex, 1);
                } else {
                    $scope.model.push({ Id: option.Id, label: option.UserName });
                }
            };

            $scope.try = function () {
                alert("Yes");
              
            }


        }
    };
});

var varMyApplication = angular.module("dropdowndetails", [
  "myDirectivesApplication"
]);

varMyApplication.controller("dropdowncontroller", function ($scope, $http) {
    $scope.completeDetails = [];
    $http.get("Home/GetNames").then(function (response) {

        angular.forEach(response.data, function (value, index) {
            $scope.completeDetails.push({ Id: value.Id, label: value.UserName })
            console.log($scope.completeDetails)

        })

    })

});