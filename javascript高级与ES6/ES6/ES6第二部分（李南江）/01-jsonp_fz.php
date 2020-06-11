<?php

$teacher = $_GET["teacher"];
$age = $_GET["age"];
$arr = array("name"=>$teacher,"age"=>$age);
$data = json_encode($arr);

$cb = $_GET["cb"];
// 返回函数的调用
echo $cb."(".$data.");";
?>