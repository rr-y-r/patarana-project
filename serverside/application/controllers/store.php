<?php
class Store extends CI_Controller{
    
    function Store(){
        parent::__construct();
        $this->load->model('Store_model');
    }
    
    function index(){
        $this->load->view('site');
    }
    
    function insert(){
        $data=json_decode(file_get_contents("php://input"));
        echo $this->Store_model->insert($data);
    }
    
    function update(){
        $data=json_decode(file_get_contents("php://input"));
        echo $this->Store_model->update($data);
    }
    
    function delete($id){
        echo $this->Store_model->delete($id);
    }
    
    public function get(){
        $store = $this->Store_model->getAll();
        echo json_encode($store);
    }
    
    public function getbyid($id){
        echo json_encode($this->Store_model->getbyid($id));
    }
    
}