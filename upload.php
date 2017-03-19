<?php
header("Access-Control-Allow-Origin: *");
var_dump($_REQUEST);
var_dump($_FILES['file']['name']);

$uploaddir = getcwd().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir.basename($_FILES['file']['name']);

move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);

?>