<?php
class User extends CI_Controller {


 
    function User(){
        parent::__construct();
        $this->load->model('User_model', '', TRUE);
        $this->load->model('Store_model','',TRUE);
    }
    function changepassword(){
        $data    = json_decode(file_get_contents("php://input"));
        $user = $this->User_model->changepassword($data);
        echo json_encode($user);
    }
    public function insert(){
        $data = json_decode(file_get_contents("php://input"));
        echo  $this->User_model->insert($data);
    }
    public function updateisactive(){
        $data = json_decode(file_get_contents("php://input"));
        echo  $this->User_model->updateisactive($data);
    }
    
    public function get(){
        $user = $this->User_model->getAll();
        echo json_encode($user);
    }
    
    public function getbyid($id){
        echo json_encode($this->User_model->getbyid($id));
    }
    
    public function checkUser(){
        sleep(2);
        $temp = 0;
        $valid = false;
        $data = json_decode(file_get_contents("php://input"),TRUE);
        $user = $this->User_model->getAll();
        echo $data['username'];
        foreach ($user as $user){
            if ($data['username']==$user['username']) {
                $temp++;
            }
        }
        if($temp==0){
            $valid = true;
            $message = "data valid!";
            echo json_encode(array(
                'isSuccessful' => TRUE,
                'message' => $message
            ));
        }
    }
    
    public function signUp(){
        
        sleep(1);

        $data = json_decode(file_get_contents("php://input"),TRUE);
        echo $data['username'];
        echo $this->Store_model->register($data['storeName']);
        sleep(2);
        $store = $this->Store_model->getbyname($data['storeName']);
        foreach($store as $store){
            $storeid = $store['id'];
        }
        echo  $this->User_model->register($data['username'],$data['password'],$data['name'],$storeid);

    }

}
