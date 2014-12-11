<?php
class Login extends CI_Controller {
    
	function Login(){
		parent::__construct();
		$this->load->model('Login_model');
	}
    
	 function index(){
         $data    = json_decode(file_get_contents("php://input"));
         $dataCheck = $this->Login_model->userCheck($data->username, $data->password);
         $this->session->set_userdata($data);
         echo json_encode($dataCheck);
	 }

}
