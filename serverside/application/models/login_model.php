<?php

class Login_model extends CI_Model {

    var $table = 'user';
	function Login_model(){
		parent::__construct();
	}
	
	function userCheck($username, $password){
         return  $this->db->query("
         SELECT userid, username, password, name, level, storeid
         FROM user
         WHERE  isactive = 1 
         AND username = '".$username."' 
         AND password = '".$password."'
         ")->result_array();
	}

}
