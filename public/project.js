

    angular.module('project',[])
     
    .value('gpioURL', '/gpio')
    .factory('gpio', ['$http', 'gpioURL',function($http, gpioURL) {
        var gpio = {
            setGpio: function (id, stat) {
                $http.get(gpioURL + '?id='+id+'&stat='+stat);
            }
        };
        return gpio;
    }])
     
    .controller('GpioController', ['$scope', 'gpio', function ($scope, gpio) {
            $scope.setGpio = function (id, stat) {
                gpio.setGpio(id, stat);
            }
        }
    ]);

