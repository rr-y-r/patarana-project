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
    
    public function signUpStore($data){
        sleep(1);
        $store = $this->Store_model->getAll();

        foreach ($store as $store){
            if ($this->input->post('$store')==$store['name']) {
                $message = "<center><strong>maaf, nama toko telah terdaftar</strong></center>";
                $this->json_response (FALSE, $message);
            } else {
                //$this->m_izin->delete($name, $this->session->userdata('uid'));
                insert();
                $message = "<center><strong>Terima Kasih Telah Menggunakan jasa kami</strong></center>";
                echo json_encode(array(
                    'isSuccessful' => TRUE,
                    'message' => $message,

                ));
            }
        }
    }
    
}