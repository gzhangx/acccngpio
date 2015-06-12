

    angular.module('project',[])
     
    .value('gpioURL', '/gpio')
    .factory('gpio', ['$http', 'gpioURL',function($http, gpioURL) {
        var gpio = {
            setGpio: function (id, stat) {
                $http.get(gpioURL + '/ctrl?id='+id+'&stat='+stat);
            },
            getGpio: function(cb) {
                $http.get(gpioURL + '/all').success(function(data) {
                   console.log('get all success with ' + data);
                   cb(data);
                });
            }
        };
        return gpio;
    }])
     
    .controller('GpioController', ['$scope', 'gpio', function ($scope, gpio) {
            $scope.setGpio = function (id, stat) {
                gpio.setGpio(id, stat);
            };
            $scope.gpios = [2,4];
            gpio.getGpio(function(data){
                $scope.gpios = data;
            });

        }
    ]);

