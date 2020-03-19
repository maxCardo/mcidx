$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $(".body");
    var offset = startchange.offset();


    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $("#header").css('background-color', 'white');
                $("#header").css('top', '0');
                $("#header").css('box-shadow', '0 2px 5px 0 rgba(0,0,0,.75)');
                $(".link").css('color', 'black');
                $(".logo").css('color', 'black');
                $(".hamburger div").css('background-color', 'black');
                $(".header__link div").css('background-color', 'black');



            } else {
                $('#header').css('background-color', 'transparent');
                $(".link").css('color', "white");
                $(".logo").css('color', 'white');
                $("#header").css('box-shadow', 'none');
                $(".header__link div").css('background-color', 'white');


            }
        });
    }

    $('.contact-mail').on('click', function () {
        if ($('.detailsWrapper--right').hasClass('open')) {
            $('.detailsWrapper--right').removeClass('open');
        } else {
            $('.detailsWrapper--right').addClass('open');
        }
    });

    /*CHECKBOX MSG COMPONENT*/
    $("#clickCustomMessage").on('click', function () {
        var isChecked = idx("#sendCustomMessage").is(":checked");
        if (isChecked) {
            $('#customMessageContainer').addClass('open');
        } else {
            $('#customMessageContainer').removeClass('open');
        }
    });
    /*END OF CHECKBOX MSG COMPONENT*/

});



const toggler = document.querySelector('.menu__toggler');
const menu = document.querySelector('.menu');

toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    menu.classList.toggle('active');
});
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-46156385-1', 'cssscript.com');
ga('send', 'pageview');