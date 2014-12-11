<?php

class Product extends CI_Controller {
    
    function Product(){
        parent::__construct();
        $this->load->model('Product_model');
    }

    function index(){
        $this->load->view('site');
    }

    function insert(){
        echo $this->session->userdata('username');
        $data=json_decode(file_get_contents("php://input"));
        echo $this->Product_model->insert($data);
    }

    function update(){
        $data=json_decode(file_get_contents("php://input"));
        echo $this->Product_model->update($data);
    }

    function delete($id){
        echo $this->Product_model->delete($id);
    }

    public function get(){
        $Product = $this->Product_model->getAll();
        echo json_encode($Product);
    }

    public function getbyid($id){
        echo json_encode($this->Product_model->getbyid($id));
    }

    function doUpload(){
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size']	= '100';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload()){
            $error = array('error' => $this->upload->display_errors());

            $this->load->view('upload_form', $error);
        }else{
            $data = array('upload_data' => $this->upload->data());

            $this->load->view('upload_success', $data);
        }
    }
    
    public function upload_file(){
        $status = "";
        $msg = "";
        $file_element_name = 'productImg';

        if (empty($_POST['title'])){
            $status = "error";
            $msg = "Please enter a title";
        }

        if ($status != "error"){
            $config['upload_path'] = './files/';
            $config['allowed_types'] = 'gif|jpg|png|doc|txt';
            $config['max_size'] = 1024 * 8;
            $config['encrypt_name'] = TRUE;

            $this->load->library('upload', $config);

            if (!$this->upload->do_upload($file_element_name))
            {
                $status = 'error';
                $msg = $this->upload->display_errors('', '');
            }
            else
            {
                $data = $this->upload->data();
                $file_id = $this->Product_model->insert_file($data['file_name'], $_POST['title']);
                if($file_id)
                {
                    $status = "success";
                    $msg = "File successfully uploaded";
                }
                else
                {
                    unlink($data['full_path']);
                    $status = "error";
                    $msg = "Something went wrong when saving the file, please try again.";
                }
            }
            @unlink($_FILES[$file_element_name]);
        }
        echo json_encode(array('status' => $status, 'msg' => $msg));
    }
    
    public function files(){

        echo json_encode($this->Product_model->get_files());
    }
}
?>