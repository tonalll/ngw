'use strict';
var ngw = angular.module('ngw', []);
ngw.controller('mycontroller', ['$scope',
    function($scope, $routeParams) {
        // console.info($scope);
        $scope.$on('$viewContentLoaded', function() {
            // console.info(1);
        });
        // console.info(2);
        $scope.move = function() {
            // console.info('move');
        }

        $scope.accordionData = [{
            title: '名字',
            text: '内容内容内容内容内容内容内容内容内容'
        }, {
            title: '名字2',
            text: '内容内容内容内容内容内容内容内容内容'
        }, {
            title: '名字3',
            text: '内容内容内容内容内容内容内容内容内容'
        }];
    }
]);
// accordion
ngw.directive('accordion', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude aa></div>',
        controller: function($scope, $element) {
            var arr = [];
            this.goOpen = function(unit) {
                angular.forEach(arr, function(arrUnit) {
                    if (arrUnit != unit) arrUnit.showMe = false;
                });
            }
            this.addUnit = function(unit) {
                arr.push(unit);
            }
        }
    }
});
ngw.directive('accordionunit', function() {
    console.info('----------');
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?accordion',
        scope: {
            title: '=title'
        },
        template: '<div class="c-unit">' + '<div ng-click="toggle()" class="c-title">{{title}}</div>' + '<div class="c-con" ng-show="showMe" ng-transclude></div>' + '</div>',
        link: function(scope, element, attrs, accordionController) {
            scope.showMe = false;
            accordionController.addUnit(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.goOpen(scope);
            }
        }
    }
});
/*
expModule.directive('expander', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        require : '^?accordion',
        scope : {
            title : '=expanderTitle'
        },
        template : '<div>'
                  + '<div class="title" ng-click="toggle()">{{title}}</div>'
                  + '<div class="body" ng-show="showMe" ng-transclude></div>'
                  + '</div>',
        link : function(scope, element, attrs, accordionController) {
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
});
*/
//监听窗口变化
ngw.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function() {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function() {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function() {
            console.info(w.width());
            console.info(w.height());
            scope.$apply();
        });

    }
});

//自定义指令
ngw.directive('tagname', function() {

    return {
        restrict: 'AECM',
        template: '<div>自定义的内容</div>',
    }
});
