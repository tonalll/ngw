'use strict';
var ngw = angular.module('ngw', []);
ngw.controller('mycontroller', ['$scope',
    function ($scope, $routeParams) {
        console.info($scope);
        $scope.$on('$viewContentLoaded', function () {
            console.info(1);
        });
        console.info(2);
        $scope.move = function () {
            console.info('move');
        }
    }])


//监听窗口变化
ngw.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            console.info(w.width());
            console.info(w.height());
            scope.$apply();
        });

    }
})