define([

], function(){
    function Ctrlstore($scope,serviceAjax,localStorageService,growl){
        
        $scope.level = localStorageService.get('user');

        $scope.loaddata = serviceAjax.getDataFromServer('store','get')
        .then(function(data){
            if (data) {
                $scope.store = data;
                $scope.$apply();
            }
        });
        
        $scope.loaddata;
        
        $scope.storeModal = function(action,id){
            if(action=='add'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('store','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.modaloption = 'show';
                        $scope.action = action;
                        $scope.data = data[0];
                        $scope.$apply();
                    } else {
                        
                        serviceAjax.getDataFromServer('store','get').then(function(data){
                            if (data) {
                                $scope.store = data['data'];
                            }
                        });

                    }
                });
            }
        };
        
        $scope.modalStore = function(action,id){
            if(action=='create'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='update'){
                serviceAjax.getDataFromServer('store','getbyid',+id).then(function(data){
                        if (data) {
                            $scope.modaloption = 'show';
                            $scope.action = action;
                            $scope.data = data[0];
                            
                        } else {

                        }
                });
            }
        }   
        
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        }
        $scope.save = function(data,action){
            if(action == 'add') $scope.submit(data); else $scope.edit(data);
        };
        /*simpan*/
        $scope.submit = function(data){
            serviceAjax.posDataToServer('store','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('store Berhasil Di Tambah!',{ttl: 2000});
                }
            });
        };
        $scope.delete = function(id){
            serviceAjax.getDataFromServer('store','delete',+id).then(function(data){
                if(data.length > 0){
                    console.log('log isinfunction');
                    
                    growl.addSuccessMessage('store Berhasil Di Delete!',{ttl: 2000});
                    serviceAjax.getDataFromServer('store','get')
                    .then(function(data){
                        if (data) {
                            $scope.store = data;
                            $scope.$apply();
                        }
                    });
                }
            });

        };
        $scope.edit = function(data){
            serviceAjax.posDataToServer('store','update',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('store Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
    }
    // set to global
    window.Ctrlstore = Ctrlstore;

    return Ctrlstore;
});