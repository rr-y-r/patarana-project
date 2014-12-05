<?php
class Category extends CI_Controller{

    function Category(){
        parent::__construct();
        $this->load->model('Category_model');
    }

    function index(){
        $this->load->view('site');
    }

    function insert(){
        $data=json_decode(file_get_contents("php://input"));
        echo $this->Category_model->insert($data);
    }

    function update(){
        $data=json_decode(file_get_contents("php://input"));
        echo $this->Category_model->update($data);
    }

    function delete($id){
        echo $this->Category_model->delete($id);
    }

    public function get(){
        $Category = $this->Category_model->getAll();
        echo json_encode($Category);
    }

    public function getbyid($id){
        echo json_encode($this->Category_model->getbyid($id));
    }

}