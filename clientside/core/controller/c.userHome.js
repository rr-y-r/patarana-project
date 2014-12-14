define([

], function(){
    function CtrluserHome($scope,serviceAjax,growl){
        $scope.nav=['product'];
        $scope.menus=$scope.nav[0];
        $scope.selectNav = function (page) {
            $scope.menus = page;
        }
        
        function getProductData(){
            serviceAjax.getDataFromServer('product','getbinded').then(function(data){
                $scope.product = data;
            });
        };
        
        $scope.loadProductData = serviceAjax.getDataFromServer('product','getbinded')
        .then(function(data){
            if (data) {
                $scope.product = data;

            }
        });
        
        $scope.productModal = function(action){
            if(action=='add'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('product','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.modaloption = 'show';
                        $scope.action = action;
                        $scope.data = data[0];
                        $scope.$apply();
                    } else {
                        serviceAjax.getDataFromServer('product','getbinded').then(function(data){
                            if (data) {
                                $scope.product = data['data'];
                            }
                        });

                    }
                });
            }
        };

        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        }

        $scope.saveProduct = function(data,action){
            $scope.submitProduct(data);
        };

        $scope.submitProduct = function(data){
            serviceAjax.posDataToServer('product','insert',data).then(function(data){
                if(data){
                    console.log(data);
                    $scope.closeModal();
                    growl.addSuccessMessage('product Berhasil Di Tambah!',{ttl: 2000});
                }
            });
        };

        $scope.deleteProduct = function(id){
            serviceAjax.getDataFromServer('product','delete',+id).then(function(data){
                if(data.length > 0){
                    console.log('log isinfunction');
                    growl.addSuccessMessage('product Berhasil Di Delete!',{ttl: 2000});
                    serviceAjax.getDataFromServer('product','getbinded')
                    .then(function(data){
                        if (data) {
                            $scope.product = data;
                            $scope.$apply();
                        }
                    });
                }
            });

        };
        $scope.editProduct = function(data){
            serviceAjax.posDataToServer('product','update',data).then(function(data){
                if(data){
                    $scope.closeModal();
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('product Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
        
         //upload file js
        
    }
        
       
    // set to global
       window.CtrluserHome = CtrluserHome;

       return CtrluserHome;
});