<?php

$pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

$password = str_shuffle($pattern);

$passlength = strlen($password) - 1;


$value = array();

for ($i = 0; $i < 8; $i++) {
    $index_number = rand(0, $passlength);
    $value[] = $pattern[$index_number];
}

echo implode($value);

?>