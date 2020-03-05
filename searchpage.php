<?php
header("Access-Control-Allow-Origin: *");
$content = file_get_contents('http://cardo.idxbroker.com/idx/search/basic');
$content = str_replace('</title>','</title><base href="http://localhost/mcidx/" />', $content);
$content = str_replace('</head>','<link rel="stylesheet" href="http://localhost/mcidx/scss/style.css" /></head>', $content);
$content = str_replace('lang="en" class=" "','lang="en" class="search-page"', $content);


echo $content;
?>