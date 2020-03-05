<?php
header("Access-Control-Allow-Origin: *");
$content = file_get_contents('http://cardo.idxbroker.com/idx/results/listings?pt=sfr&lp=0&hp=800000');
$content = str_replace('</title>','</title><base href="http://localhost/mcidx/" />', $content);
$content = str_replace('</head>','<link rel="stylesheet" href="http://localhost/mcidx/scss/style.css" />', $content);

echo $content;
?>