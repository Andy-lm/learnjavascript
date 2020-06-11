<?php
// 0.拿到传递过来的数据
$teacher = $_GET["teacher"];
$age = $_GET["age"];
$arr = array("name"=>$teacher, "age"=>$age);
$data = json_encode($arr);

// 1.拿到回调函数的名称
//$cb = $_GET["callback"]; // jQuery112406520384710124194_1559732574283
$cb = $_GET["cb"]; // lnj
// 2.返回数据
//echo $cb."(666);"; // jQuery112406520384710124194_1559732574283(666);
echo $cb."(".$data.");"; // jQuery112406520384710124194_1559732574283(666);
?>