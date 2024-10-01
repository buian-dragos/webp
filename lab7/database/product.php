<?php

class Product {
    public $id;
    public $name;
    public $price;
    public $category;

    function __construct($id, $name, $price, $category)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->category = $category;        
    }

    function get_id(){
        return $this->id;
    }

    function set_id($newId){
        $this->id = $newId;
    }

    function get_name(){
        return $this->name;
    }

    function set_name($newName){
        $this->name = $newName;
    }

    function get_price(){
        return $this->price;
    }

    function set_price($newPrice){
        $this->price = $newPrice;
    }

    function get_category(){
        return $this->category;
    }

    function set_category($newCategory){
        $this->category = $newCategory;
    }
}
