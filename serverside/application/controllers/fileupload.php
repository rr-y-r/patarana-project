<?php 
class Fileupload extends CI_Controller{
    function __construct(){
        parent::__construct();
    }

    function index(){
        error_reporting(E_ALL | E_STRICT);
        $this->load->library("CustomUploadHandler");
    }
}