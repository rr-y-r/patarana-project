<?php
class Category_model extends CI_Model{

    protected $tblname='category';

    function Category_model(){
        parent::__construct();
    }

    function getAll(){
        return $this->db->get($this->tblname)->result_array();
    }

    function insert($data){
        return $this->db->insert($this->tblname,$data);
    }

    function update($data){
        return $this->db->update(tblname, $data, array('id' => $data->id));
    }

    function delete($id){
        return $this->db->delete($this->tblname,array('id'=>$id));
    }

    function get(){
        $Category = self::getAll();
        $data = array();
        foreach($Category as $key => $val){
            $data['category'][$val['id']][$val['note']][$val['type']] = $val;
        }
        return $data;
    }

    function getbyid($id){
        return $this->db->get_where($this->tblname , array('id' => $id))->result_array();
    }

}