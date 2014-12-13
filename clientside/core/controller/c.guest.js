define([

], function(){
    function Ctrlguest($scope,serviceAjax,growl){
        $scope.nav=['product'];
        $scope.menus=$scope.nav[0];
        $scope.selectNav = function (page) {
            $scope.menus = page;
        }
        
        $scope.loadProductData = serviceAjax.getDataFromServer('product','get')
        .then(function(data){
            if (data) {
                $scope.product = data;

            }
        });
        
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        }
        
        $scope.modalStore = function(id){
            console.log(id);
            serviceAjax.getDataFromServer('store','getbyid',+id).then(function(data){
                if (data) {
                    $scope.modaloption = 'show';
                    $scope.data = data[0];
                } else {
                    $scope.modaloption = 'show';
                }
            });
             $scope.modaloption = 'show';
        }

    }
    // set to global
    window.Ctrlguest = Ctrlguest;

    return Ctrlguest;
});