define([

], function(){
    function CtrluserHome($scope,serviceAjax,growl){
        $scope.nav=['store','item'];
        $scope.menus=$scope.nav[0];
        $scope.selectNav = function (page) {
            $scope.menus = page;
        }     
    }
    // set to global
       window.CtrluserHome = CtrluserHome;

       return CtrluserHome;
});