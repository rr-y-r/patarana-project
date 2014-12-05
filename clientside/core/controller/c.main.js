define([

], function(){
    function Ctrlmain($scope,serviceAjax,growl){
        
        $scope.nav=['user','store'];
        $scope.menus=$scope.nav[0];
        $scope.selectNav = function (page) {
            $scope.menus = page;
        }
        
        function getStoreData(){
            serviceAjax.getDataFromServer('store','get').then(function(data){
                if (data) {
                    $scope.store = data;
                    
                }
            });
        }
        
        //store function
        $scope.loadStoreData = serviceAjax.getDataFromServer('store','get')
        .then(function(data){
            if (data) {
                $scope.store = data;

            }
        });
        
        $scope.createStore = function(data){
            serviceAjax.posDataToServer('store','insert',data).then(function(data){
                if(data){
                    //add success action
                    getStoreData();
                }
            })
        }
        
        $scope.deleteStore = function(id){
            serviceAjax.getDataFromServer('store','delete',+id).then(function(data){
                if(data.length > 0){
                    console.log('log isinfunction');
                    
                    growl.addSuccessMessage('store Berhasil Di Delete!',{ttl: 2000});
                    getStoreData();
                }
            });

        }
        
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
                            $scope.modaloption = 'show';
                            $scope.action = action;
                        }
                });
            }
        }
        
        $scope.update = function(data){
            serviceAjax.posDataToServer('store','update',data).then(function(data){
                if(data){
                    /*close modal*/
                    getStoreData();
                    $scope.closeModal();
                    /*tamplikan list*/
                    growl.addSuccessMessage('store Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
        
        $scope.save = function(data,action){
            if(action == 'create') $scope.createStore(data); else $scope.update(data);
        };
        
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        }
        
        //end of store function
        
        //user function
        $scope.loadUsereData = serviceAjax.getDataFromServer('user','get')
        .then(function(data){
            if (data) {
                $scope.user = data;

            }
        });
        
        function getUserData(){
            serviceAjax.getDataFromServer('user','get').then(function(data){
                if (data) {
                    $scope.user = data;

                }
            });
        }
        
        $scope.userModal = function(action,id){
            if(action=='setActive'){
                serviceAjax.getDataFromServer('user','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.uModalAct = 'show';
                        $scope.uModalAction = action;
                        $scope.data = data[0];
                    } else {

                    }
                });
            }else if(action =='deleteUser'){
                serviceAjax.getDataFromServer('user','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.uModalAct = 'show';
                        $scope.uModalAction = action;
                        $scope.data = data[0];
                    } else {

                    }
                });
            }
        }
        
        $scope.deleteUser = function(data){
            
        }
        
        $scope.setActive = function(data){
            var status = data.isactive == '1' ? 'Non Active' :'Active';
            var bool = data.isactive == '1' ? 0:1;
            var userdata ={
                userid :data.userid ,
                isactive : bool
            };
            serviceAjax.posDataToServer('user','updateisactive',userdata).then(function(data){
                if(data){
                    growl.addSuccessMessage('User '+data.userid+' Berhasil Di '+status,{ttl: 2000});
                }
            });
            getUserData();
            $scope.closeUserModal();
            
        }
        
        $scope.submitUserModal = function(data,action){
            if(action == 'setActive') $scope.setActive(data);else $scope.deleteUser(data);
        }
        
        $scope.closeUserModal = function(){
            $scope.uModalAct = 'hide';
            $scope.data = '';
            getUserData();
        }
        
        };

    
    
    // set to global
    window.Ctrlmain = Ctrlmain;

    return Ctrlmain;
});

