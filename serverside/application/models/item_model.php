<?php
class Item_model extends CI_Model {

    function Item_model()
    {
        parent::__construct();
    }
    protected $tblname = 'item';
    function get_all()
    {
        return $this->db->get($this->tblname)->result_array();
    }

    function insert($data){
        return $this->db->insert($this->tblname, $data);
    }
    function delete($id){
        return $this->db->delete($this->tblname, array('id' => $id));
    }
    function getbyid($id){
        return $this->db->get_where($this->tblname , array('id' => $id))->result_array();
    }
    function update($data){
        return  $this->db->query("update ".$this->tblname." set title = '".$data->title."' , quantity = '".$data->quantity."', note = '".$data->note."', price = '".$data->price."', status = '".$data->status."', category_id_category = '".$data->category_id_category."' where id =".$data->id);
    }

    function get(){

        $item = self::get_all();
        $data = array();
        foreach($item as $key => $val){
            $data['item'][$val['id']][$val['title']][$val['quantity']][$val['note']][$val['price']][$val['status']][$val['category_id_category']] = $val;
        }
        return $data;
    }

    function count(){
        return $this->db->count_all($this->tblname);
    }
}