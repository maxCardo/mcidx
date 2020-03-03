<?php
header("Access-Control-Allow-Origin: *");
$content = file_get_contents('http://cardo.idxbroker.com/idx/details/listing/d504/1430343/241-Jefferson-Lane-Cranberry-Township-PA-16066');
$content = str_replace('</title>','</title><base href="http://localhost/mcidx/" />', $content);
$content = str_replace('</head>','<link rel="stylesheet" href="http://localhost/mcidx/scss/style.css" /></head>', $content);
$content = str_replace('<html lang="en" class=" ">','<html lang="en" class="property-page">', $content);

$jscript = '<script>
    document.getElementsByTagName("html")[0].classList.add("propertypage");
</script>';
$content = str_replace('</html>',$jscript.'</html>', $content);

echo $content;
?>