<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcardo.github.io/mcidx/style.css">
    <title>Max Cardo Ltd</title>
</head>

<body>
<div class="w3-top">
    <div class="w3-bar w3-white w3-card" id="myNavbar">
        <a href="https://maxcardo.github.io/mcidx/"
           class="w3-bar-item w3-button w3-wide">
            <span style="font-family:Brush Script MT; font-size: 20px">Max Cardo</span> <span
                    style=" font-family: Brush Script MT;font-size: 10px">Ltd</span>

        </a>
        <!-- Right-sided navbar links -->
        <div class="w3-right w3-tiny w3-hide-small" style="margin-top: 10px">
            <a href="http://cardo.idxbroker.com/idx/search/basic" class="w3-bar-item w3-button"><i
                        class="fa fa-th"></i> Search</a>
            <a href="http://cardo.idxbroker.com/idx/map/mapsearch" class="w3-bar-item w3-button"><i class="fa fa-wrench"></i>Map Search</a>
            <a href="" class="https://rethinkpm.herokuapp.com/dashboard"><i class="fa fa-wrench"></i>My Portal</a>
            <a href="contactGF.html" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i> CONTACT US</a>
        </div>
        <!-- Hide right-floated links on small screens and replace them with a menu icon -->

        <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"
           onclick="w3_open()">
            <i class="fa fa-bars"></i>
        </a>
    </div>
</div>
<!-- Sidebar on small screens when clicking the menu icon -->
<nav class="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large"
     style="display:none" id="mySidebar">
    <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-large w3-padding-16">Close
        ×</a>
    <a href="#about" onclick="w3_close()" class="w3-bar-item w3-button">About Us</a>
    <a href="#team" onclick="w3_close()" class="w3-bar-item w3-button">Apartment Rentals</a>
    <a href="#buy" onclick="w3_close()" class="w3-bar-item w3-button">Sell Your Property</a>
    <a href="#resident" onclick="w3_close()" class="w3-bar-item w3-button">Current Resident</a>
    <a href="contactGF.html" onclick="w3_close()" class="w3-bar-item w3-button">Contact Us</a>
</nav>
<!-- Header with full-height image -->
<div class="bgimg-1 w3-display-container w3-grayscale-min" id="idxStart"></div>
<div id="idxStop"></div>

<script src="https://maxcardo.github.io/mcidx/main.js"></script>
</body>

</html>