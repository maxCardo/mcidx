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

    const countyIdMap = {
        'allegheny': 696,
        'butler': 1058,
        'beaver': 678,
        'westmoreland': 330,
        'washington': 719,
    };

    const neighborhoodMap = [
        {"id":"Adamsburg","text":"Adamsburg"},
        {"id":"Albion","text":"Albion"},
        {"id":"Aliquippa","text":"Aliquippa"},
        {"id":"Allentown","text":"Allentown"},
        {"id":"Ambridge","text":"Ambridge"},
        {"id":"Amwell","text":"Amwell"},
        {"id":"Arlington","text":"Arlington"},
        {"id":"Armstrong\/Shelocta","text":"Armstrong\/Shelocta"},
        {"id":"Arnold","text":"Arnold"},
        {"id":"Aspinwall","text":"Aspinwall"},
        {"id":"Avalon","text":"Avalon"},
        {"id":"Avella","text":"Avella"},
        {"id":"Baden","text":"Baden"},
        {"id":"Banksville\/Westwood","text":"Banksville\/Westwood"},
        {"id":"Barkeyville","text":"Barkeyville"},
        {"id":"Beallsville","text":"Beallsville"},
        {"id":"Beaver","text":"Beaver"},
        {"id":"Beaver-CRA","text":"Beaver-CRA"},
        {"id":"Beechview","text":"Beechview"},
        {"id":"Bellevue","text":"Bellevue"},
        {"id":"Beltzhoover","text":"Beltzhoover"},
        {"id":"Bentleyville","text":"Bentleyville"},
        {"id":"Berlin","text":"Berlin"},
        {"id":"Bessemer","text":"Bessemer"},
        {"id":"Blackridge","text":"Blackridge"},
        {"id":"Blawnox","text":"Blawnox"},
        {"id":"Bloomfield","text":"Bloomfield"},
        {"id":"Bloomfield-CRA","text":"Bloomfield-CRA"},
        {"id":"Bobtown\/Dilliner","text":"Bobtown\/Dilliner"},
        {"id":"Brackenridge","text":"Brackenridge"},
        {"id":"Braddock","text":"Braddock"},
        {"id":"Brentwood","text":"Brentwood"},
        {"id":"Bridgeville","text":"Bridgeville"},
        {"id":"Bridgewater","text":"Bridgewater"},
        {"id":"Brookline","text":"Brookline"},
        {"id":"Brownsville","text":"Brownsville"},
        {"id":"Burrel\/Blacklick","text":"Burrel\/Blacklick"},
        {"id":"California","text":"California"},
        {"id":"Callensburg","text":"Callensburg"},
        {"id":"Canonsburg","text":"Canonsburg"},
        {"id":"Carmichaels\/Cumblnd","text":"Carmichaels\/Cumblnd"},
        {"id":"Carnegie","text":"Carnegie"},
        {"id":"Carrick","text":"Carrick"},
        {"id":"Cecil","text":"Cecil"},
        {"id":"Centerville","text":"Centerville"},
        {"id":"Chartiers","text":"Chartiers"},
        {"id":"Cheswick","text":"Cheswick"},
        {"id":"Clairton","text":"Clairton"},
        {"id":"Clarion","text":"Clarion"},
        {"id":"Clarksville","text":"Clarksville"},
        {"id":"Claysville","text":"Claysville"},
        {"id":"Clintonville","text":"Clintonville"},
        {"id":"Cokeburg","text":"Cokeburg"},
        {"id":"Conneautville","text":"Conneautville"},
        {"id":"Connellsville","text":"Connellsville"},
        {"id":"Conway","text":"Conway"},
        {"id":"Cooperstown","text":"Cooperstown"},
        {"id":"Coraopolis","text":"Coraopolis"},
        {"id":"Corry","text":"Corry"},
        {"id":"Cowansville","text":"Cowansville"},
        {"id":"Crafton","text":"Crafton"},
        {"id":"Crucible","text":"Crucible"},
        {"id":"Darlington","text":"Darlington"},
        {"id":"Dawson","text":"Dawson"},
        {"id":"Delmont","text":"Delmont"},
        {"id":"Donora","text":"Donora"},
        {"id":"Dormont","text":"Dormont"},
        {"id":"Dravosburg","text":"Dravosburg"},
        {"id":"Dunbar","text":"Dunbar"},
        {"id":"Duquesne","text":"Duquesne"},
        {"id":"Eastvale","text":"Eastvale"},
        {"id":"Economy","text":"Economy"},
        {"id":"Edgewood","text":"Edgewood"},
        {"id":"Edgeworth","text":"Edgeworth"},
        {"id":"Edinboro","text":"Edinboro"},
        {"id":"Elliott","text":"Elliott"},
        {"id":"Emsworth","text":"Emsworth"},
        {"id":"Espyville","text":"Espyville"},
        {"id":"Etna","text":"Etna"},
        {"id":"Everson","text":"Everson"},
        {"id":"Export","text":"Export"},
        {"id":"Fairchance","text":"Fairchance"},
        {"id":"Fallowfield","text":"Fallowfield"},
        {"id":"Fallston","text":"Fallston"},
        {"id":"Farmington","text":"Farmington"},
        {"id":"Farrell","text":"Farrell"},
        {"id":"Fineview","text":"Fineview"},
        {"id":"Finleyville","text":"Finleyville"},
        {"id":"Fisher","text":"Fisher"},
        {"id":"Foxburg","text":"Foxburg"},
        {"id":"Frazer","text":"Frazer"},
        {"id":"Fredonia","text":"Fredonia"},
        {"id":"Freedom","text":"Freedom"},
        {"id":"Garfield","text":"Garfield"},
        {"id":"Georgetown","text":"Georgetown"},
        {"id":"Glassport","text":"Glassport"},
        {"id":"Glenfield","text":"Glenfield"},
        {"id":"Graysville","text":"Graysville"},
        {"id":"Green\/Commdre\/Prchse","text":"Green\/Commdre\/Prchse"},
        {"id":"Greenfield","text":"Greenfield"},
        {"id":"Greensboro","text":"Greensboro"},
        {"id":"Greentree","text":"Greentree"},
        {"id":"Greenwood","text":"Greenwood"},
        {"id":"Hampton","text":"Hampton"},
        {"id":"Harmar","text":"Harmar"},
        {"id":"Hawthorne","text":"Hawthorne"},
        {"id":"Hayfield","text":"Hayfield"},
        {"id":"Hazelwood","text":"Hazelwood"},
        {"id":"Heidelberg","text":"Heidelberg"},
        {"id":"Hermitage","text":"Hermitage"},
        {"id":"Holbrook","text":"Holbrook"},
        {"id":"Homestead","text":"Homestead"},
        {"id":"Homewood","text":"Homewood"},
        {"id":"Homewood-Brushton","text":"Homewood-Brushton"},
        {"id":"Hookstown","text":"Hookstown"},
        {"id":"Houston","text":"Houston"},
        {"id":"Hunker","text":"Hunker"},
        {"id":"Imperial","text":"Imperial"},
        {"id":"Industry","text":"Industry"},
        {"id":"Ingram","text":"Ingram"},
        {"id":"Irwin","text":"Irwin"},
        {"id":"Jamestown","text":"Jamestown"},
        {"id":"Jeannette","text":"Jeannette"},
        {"id":"Jefferson","text":"Jefferson"},
        {"id":"Jefferson\/Mather","text":"Jefferson\/Mather"},
        {"id":"Knox","text":"Knox"},
        {"id":"Knoxville","text":"Knoxville"},
        {"id":"Koppel","text":"Koppel"},
        {"id":"Latrobe","text":"Latrobe"},
        {"id":"Lawrenceville","text":"Lawrenceville"},
        {"id":"Leeper","text":"Leeper"},
        {"id":"Leetsdale","text":"Leetsdale"},
        {"id":"Lickingville","text":"Lickingville"},
        {"id":"Lincoln-Larimer","text":"Lincoln-Larimer"},
        {"id":"Loyalhanna","text":"Loyalhanna"},
        {"id":"Manchester","text":"Manchester"},
        {"id":"Manor","text":"Manor"},
        {"id":"Mapletown","text":"Mapletown"},
        {"id":"Markleysburg","text":"Markleysburg"},
        {"id":"Marshall","text":"Marshall"},
        {"id":"Masontown","text":"Masontown"},
        {"id":"McCandless","text":"McCandless"},
        {"id":"McClellandtown","text":"McClellandtown"},
        {"id":"McKeesport","text":"McKeesport"},
        {"id":"Meadowlands","text":"Meadowlands"},
        {"id":"Midway","text":"Midway"},
        {"id":"Millvale","text":"Millvale"},
        {"id":"Monaca","text":"Monaca"},
        {"id":"Monessen","text":"Monessen"},
        {"id":"Monongahela","text":"Monongahela"},
        {"id":"Monroeville","text":"Monroeville"},
        {"id":"Montgomery\/Grant","text":"Montgomery\/Grant"},
        {"id":"Morningside","text":"Morningside"},
        {"id":"Munhall","text":"Munhall"},
        {"id":"Murrysville","text":"Murrysville"},
        {"id":"Natrona","text":"Natrona"},
        {"id":"Nemacolin","text":"Nemacolin"},
        {"id":"Newell","text":"Newell"},
        {"id":"Nottingham","text":"Nottingham"},
        {"id":"O'Hara","text":"O'Hara"},
        {"id":"Oakdale","text":"Oakdale"},
        {"id":"Oakland","text":"Oakland"},
        {"id":"Oakmont","text":"Oakmont"},
        {"id":"Ohiopyle","text":"Ohiopyle"},
        {"id":"Ohioville","text":"Ohioville"},
        {"id":"Overbrook","text":"Overbrook"},
        {"id":"Pennsbury","text":"Pennsbury"},
        {"id":"Perryopolis","text":"Perryopolis"},
        {"id":"Pine-CRA","text":"Pine-CRA"},
        {"id":"Pitcairn","text":"Pitcairn"},
        {"id":"Randolph","text":"Randolph"},
        {"id":"Rankin","text":"Rankin"},
        {"id":"Republic","text":"Republic"},
        {"id":"Reserve","text":"Reserve"},
        {"id":"Richland","text":"Richland"},
        {"id":"Richmond","text":"Richmond"},
        {"id":"Rimersburg","text":"Rimersburg"},
        {"id":"Rochester","text":"Rochester"},
        {"id":"Rogersville","text":"Rogersville"},
        {"id":"Rome","text":"Rome"},
        {"id":"Roscoe","text":"Roscoe"},
        {"id":"Rostraver","text":"Rostraver"},
        {"id":"Saegertown","text":"Saegertown"},
        {"id":"Scottdale","text":"Scottdale"},
        {"id":"Sewickley","text":"Sewickley"},
        {"id":"Shadyside","text":"Shadyside"},
        {"id":"Shaler","text":"Shaler"},
        {"id":"Sharon","text":"Sharon"},
        {"id":"Sharpsburg","text":"Sharpsburg"},
        {"id":"Sharpsville","text":"Sharpsville"},
        {"id":"Sheakleyville","text":"Sheakleyville"},
        {"id":"Shenango-CRA","text":"Shenango-CRA"},
        {"id":"Sheraden","text":"Sheraden"},
        {"id":"Shippenville","text":"Shippenville"},
        {"id":"Shippingport","text":"Shippingport"},
        {"id":"Sligo","text":"Sligo"},
        {"id":"Smith","text":"Smith"},
        {"id":"Smithfield","text":"Smithfield"},
        {"id":"Smithton","text":"Smithton"},
        {"id":"Spara","text":"Spara"},
        {"id":"Spring","text":"Spring"},
        {"id":"Springfield","text":"Springfield"},
        {"id":"Stockdale","text":"Stockdale"},
        {"id":"Stoneboro","text":"Stoneboro"},
        {"id":"Stuben","text":"Stuben"},
        {"id":"Sutersville","text":"Sutersville"},
        {"id":"Swissvale","text":"Swissvale"},
        {"id":"Tarentum","text":"Tarentum"},
        {"id":"Templeton","text":"Templeton"},
        {"id":"Thornburg","text":"Thornburg"},
        {"id":"Titusville","text":"Titusville"},
        {"id":"Trafford","text":"Trafford"},
        {"id":"Troy","text":"Troy"},
        {"id":"Uniontown","text":"Uniontown"},
        {"id":"Vanderbilt","text":"Vanderbilt"},
        {"id":"Vanport","text":"Vanport"},
        {"id":"Verona","text":"Verona"},
        {"id":"Wampum","text":"Wampum"},
        {"id":"Washington\/Creekside","text":"Washington\/Creekside"},
        {"id":"Waterford","text":"Waterford"},
        {"id":"Wattsburg","text":"Wattsburg"},
        {"id":"Wheatland","text":"Wheatland"},
        {"id":"Whitaker","text":"Whitaker"},
        {"id":"Whitehall","text":"Whitehall"},
        {"id":"Wilkinsburg","text":"Wilkinsburg"},
        {"id":"Wilmerding","text":"Wilmerding"},
        {"id":"Woodcock","text":"Woodcock"},
        {"id":"Worthington","text":"Worthington"},
        {"id":"Youngwood","text":"Youngwood"},
        {"id":"Adams Twp","text":"Adams Twp"},
        {"id":"Addison Boro","text":"Addison Boro"},
        {"id":"Addison Twp","text":"Addison Twp"},
        {"id":"Aleppo - GRE","text":"Aleppo - GRE"},
        {"id":"Aleppo - NAL","text":"Aleppo - NAL"},
        {"id":"Allegheny Twp - BUT","text":"Allegheny Twp - BUT"},
        {"id":"Allegheny Twp - SOM","text":"Allegheny Twp - SOM"},
        {"id":"Allegheny Twp - WML","text":"Allegheny Twp - WML"},
        {"id":"Allegheny West","text":"Allegheny West"},
        {"id":"Allenport Boro","text":"Allenport Boro"},
        {"id":"Apollo Boro","text":"Apollo Boro"},
        {"id":"Applewood Borough","text":"Applewood Borough"},
        {"id":"Baldwin Boro","text":"Baldwin Boro"},
        {"id":"Baldwin Twp","text":"Baldwin Twp"},
        {"id":"Beaver Falls","text":"Beaver Falls"},
        {"id":"Bell Acres","text":"Bell Acres"},
        {"id":"Bell Twp","text":"Bell Twp"},
        {"id":"Belle Vernon - FAY","text":"Belle Vernon - FAY"},
        {"id":"Belle Vernon - WML","text":"Belle Vernon - WML"},
        {"id":"Ben Avon","text":"Ben Avon"},
        {"id":"Ben Avon Heights","text":"Ben Avon Heights"},
        {"id":"Benson Boro","text":"Benson Boro"},
        {"id":"Bethel Park","text":"Bethel Park"},
        {"id":"Bethel Twp","text":"Bethel Twp"},
        {"id":"Big Beaver","text":"Big Beaver"},
        {"id":"Bigelow Heights","text":"Bigelow Heights"},
        {"id":"Black Twp","text":"Black Twp"},
        {"id":"Blacklick Valley School District","text":"Blacklick Valley School District"},
        {"id":"Blaine Twp","text":"Blaine Twp"},
        {"id":"Blairsville Area","text":"Blairsville Area"},
        {"id":"Boggs Twp","text":"Boggs Twp"},
        {"id":"Bon Air","text":"Bon Air"},
        {"id":"Boswell Boro","text":"Boswell Boro"},
        {"id":"Braddock Hills","text":"Braddock Hills"},
        {"id":"Bradford Woods","text":"Bradford Woods"},
        {"id":"Brady Twp - BUT","text":"Brady Twp - BUT"},
        {"id":"Brady's Bend Twp","text":"Brady's Bend Twp"},
        {"id":"Brighton Heights","text":"Brighton Heights"},
        {"id":"Brighton Twp","text":"Brighton Twp"},
        {"id":"Brockway Area School District","text":"Brockway Area School District"},
        {"id":"Brookville Area School District","text":"Brookville Area School District"},
        {"id":"Brothersvalley Twp","text":"Brothersvalley Twp"},
        {"id":"Bruin Boro","text":"Bruin Boro"},
        {"id":"Brush Val\/Buffington","text":"Brush Val\/Buffington"},
        {"id":"Buffalo Twp - BUT","text":"Buffalo Twp - BUT"},
        {"id":"Buffalo Twp - WSH","text":"Buffalo Twp - WSH"},
        {"id":"Bullskin Twp","text":"Bullskin Twp"},
        {"id":"Burgettstown Boro","text":"Burgettstown Boro"},
        {"id":"Burrell Twp","text":"Burrell Twp"},
        {"id":"Cadogan Twp","text":"Cadogan Twp"},
        {"id":"Calbride Place","text":"Calbride Place"},
        {"id":"Callery Boro","text":"Callery Boro"},
        {"id":"Cambria Heights School District","text":"Cambria Heights School District"},
        {"id":"Cambridge Springs","text":"Cambridge Springs"},
        {"id":"Canadohta Lake","text":"Canadohta Lake"},
        {"id":"Canal Twp","text":"Canal Twp"},
        {"id":"Canoe\/Banks Twps","text":"Canoe\/Banks Twps"},
        {"id":"Canton Twp","text":"Canton Twp"},
        {"id":"Carroll Twp.","text":"Carroll Twp."},
        {"id":"Castle Shannon","text":"Castle Shannon"},
        {"id":"Center Twp - BEA","text":"Center Twp - BEA"},
        {"id":"Center Twp - BUT","text":"Center Twp - BUT"},
        {"id":"Center Twp\/Homer Cty","text":"Center Twp\/Homer Cty"},
        {"id":"Central Cambria School District","text":"Central Cambria School District"},
        {"id":"Central City Borough","text":"Central City Borough"},
        {"id":"Central North Side","text":"Central North Side"},
        {"id":"Chalfant Boro","text":"Chalfant Boro"},
        {"id":"Charleroi Boro","text":"Charleroi Boro"},
        {"id":"Chartiers City","text":"Chartiers City"},
        {"id":"Cherry Twp","text":"Cherry Twp"},
        {"id":"Cherry Valley - WSH","text":"Cherry Valley - WSH"}
    ];

    /* HOME PAGE SEARCH */
    if ($('#initiateSearch').length) {
        $('#initiateSearch').on('click', function (event) {
            event.preventDefault();
            var url = window.location.href;
            history.pushState(null, "", url);

            let hrefBase = 'http://cardo.idxbroker.com/idx/results/listings?';

            let searchTerm = $('#searchField').val().trim().toLowerCase();

            let isnum = /^\d+$/.test(searchTerm);

            let isCounty = countyIdMap.hasOwnProperty(searchTerm);

            let isNeighborhood = false;
            let targetNeighborhood;
            neighborhoodMap.forEach(function (item) {
                if (item.id.toLowerCase() == searchTerm) {
                    isNeighborhood = true;
                    targetNeighborhood = item.id.toLowerCase().replace(/\s/g, '+');
                }
            });

            let searchTermLength = searchTerm.length;

            if (isnum && (searchTermLength == 5)) {
                let fullHref = hrefBase + 'pt=sfr&ccz=zipcode&zipcode%5B%5D=' + searchTerm;
                window.location.replace(fullHref);
            } else if (isCounty) {
                let fullHref = hrefBase + 'pt=sfr&ccz=county&county%5B%5D=' + countyIdMap[searchTerm];
                window.location.replace(fullHref);
            } else if (isCounty) {
                let fullHref = hrefBase + 'pt=sfr&ccz=county&county%5B%5D=' + countyIdMap[searchTerm];
                window.location.replace(fullHref);
            } else if (isNeighborhood) {
                let fullHref = hrefBase + 'idxID=d504&pt=1&a_mlsareaminor%5B%5D=' + targetNeighborhood;
                window.location.replace(fullHref);
            } else {
                console.log("THE ELSE");
            }

            console.log(neighborhoodMap.length);

        });
    }
    /* END OF HOME PAGE SEARCH */

    if ($('#cfc_contact_form').length) {
        $('#submitContactForm').on('click', function (event) {
            event.preventDefault();
            let name = $('#cfc_name').val().trim();
            let email = $('#cfc_email').val().trim();
            let phone = $('#cfc_phone').val().trim();
            let subject = $('#cfc_interest').val();
            let message = $('#cfc_message').val().trim();

            let data = {
                'name': name,
                'email': email,
                'phone': phone,
                'subject': subject,
                'message': message
            };

            $.ajax({
                url: 'https://rethink-dev.herokuapp.com/api/sales/web_lead',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    window.location.replace('http://cardo.tech');
                },
                data: JSON.stringify(data)
            });
        });
    }
});


if ($('.menu__toggler').length && $('.menu')) {
    const toggler = document.querySelector('.menu__toggler');
    const menu = document.querySelector('.menu');

    toggler.addEventListener('click', () => {
        toggler.classList.toggle('active');
        menu.classList.toggle('active');
    });
}


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