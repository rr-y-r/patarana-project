<?php
class Store_model extends CI_Model{
    
    protected $tblname='store';
    
    function Store_model(){
        parent::__construct();
    }
    
    function getAll(){
        return $this->db->get($this->tblname)->result_array();
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
        $store = self::getAll();
        $data = array();
        foreach($store as $key => $val){
            $data['Store'][$val['id']][$val['name']] = $val;
        }
        return $data;
    }
    
    function getbyid($id){
        return $this->db->get_where($this->tblname , array('id' => $id))->result_array();
    }
    
}