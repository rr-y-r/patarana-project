define([

], function(){
    function Ctrllogin($scope,serviceAjax,$location,localStorageService,growl,$timeout){

        $scope.loading = false;
        $scope.login = {};

        $scope.loginCheck = function(){
            $scope.loading = true;
            
            if($scope.login['username'] !== undefined || $scope.login['password'] != undefined ){
                serviceAjax.posDataToServer('login',$scope.login).then(function(data){
                    $timeout(function(){
                        if (data.length > 0) {
                            
                            //$location.path('/main');
                            localStorageService.add('user',data);
                            if (data[0]['level'] == 'admin'){
                                $location.path('/main');
                                localStorageService.add('user',data);
                            }else{
                                $location.path('/userHome');
                                localStorageService.add('user',data);   
                            }
                        } else {
                            growl.addWarnMessage("Ops, User / Pass Anda Tidak Terdaftar Di database ",{ttl: 1000});
                            $scope.loading = false;
                        }
                    },2000);
                });
            }else{
                $scope.loading = false;
                growl.addErrorMessage("ops, sepertinya anda melewatkan sesuatu",{ttl: 2000});
            }
        };
        
        $scope.signUp = function(data){
            serviceAjax.posDataToServer('user','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    /*tamplikan list*/
                    growl.addSuccessMessage('registrasi berhasil!',{ttl: 2000});
                    $scope.closeModal();
                }
            });
        }
        
        $scope.closeModal = function(){
            $scope.signUpModal = 'hide';
            $scope.data = '';
        }
        
        $scope.modalStore = function(signUpStep,id){
            if(signUpStep=='CreateUser'){
                $scope.modaloption = 'show';
                $scope.signUpStep = signUpStep;
            }else if(signUpStep =='createStore'){
                serviceAjax.getDataFromServer('store','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.modaloption = 'show';
                        $scope.signUpStep = signUpStep;
                        $scope.data = data[0];
                    } else {

                    }
                });
            }
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
        



    }

    // set to global
    window.Ctrllogin = Ctrllogin;

    return Ctrllogin;
});