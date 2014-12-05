<?php
class User extends CI_Controller {


 
    function User(){
        parent::__construct();
        $this->load->model('User_model', '', TRUE);
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

}
