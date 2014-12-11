<?php
class Product_model extends CI_Model {
    
    protected $tblname='product';

    function product_model(){
        parent::__construct();
    }

    function getAll(){
        return $this->db->get($this->tblname)->result_array();
    }
    
    function getStoreId(){
        
    }

    function insert($data){
        return $this->db->insert($this->tblname,$data);
    }

    function update($data){
        return  $this->db->query("update ".$this->tblname." set name = '".$data->name."' where id =".$data->id);
    }

    function delete($id){
        return $this->db->delete($this->tblname,array('id'=>$id));
    }

    function get(){
        $product = self::getAll();
        $data = array();
        foreach($product as $key => $val){
            $data['product'][$val['id']][$val['name']] = $val;
        }
        return $data;
    }

    function register($name){
        return $this->db->insert($this->tblname,array('name'=>$name));
    }

    function getbyname($name){
        return $this->db->get_where($this->tblname , array('name' => $name))->result_array();
    }

    function getbyid($id){
        return $this->db->get_where($this->tblname , array('id' => $id))->result_array();
    }

    function insert_file($filename, $title){
        $data = array(
        'filename'      => $filename,
        'title'         => $title
        );
        $this->db->insert('img', $data);
        return $this->db->insert_id();
    }
    
    function get_files(){
        return $this->db->select()
            ->from('img')
            ->get()
            ->result();
    }

}