//controller
ngw.controller('mycontroller', ['$scope',
    function ($scope, $routeParams) {
        // console.info($scope);
        $scope.$on('$viewContentLoaded', function () {
            // console.info(1);
        });
        // console.info(2);
        $scope.move = function () {
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
//菜单
ngw.controller('menu', ['$http', '$scope',
    function ($http, $scope) {
        //
        console.info($http);
        $http({
            method: 'post',
            url: config.menuUrl
        }).success(function (data) {
            console.info(data);
            $scope.menu = data;

        });
}]);