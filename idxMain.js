idx(document).ready(function() {
  var scroll_start = 0;
  var startchange = idx(".body");
  var offset = startchange.offset();

  if (startchange.length) {
    idx(document).scroll(function() {
      scroll_start = idx(this).scrollTop();
      if (scroll_start > offset.top) {
        idx("#header").css("background-color", "white");
        idx("#header").css("top", "0");
        idx("#header").css("box-shadow", "0 2px 5px 0 rgba(0,0,0,.75)");
        idx(".link").css("color", "black");
        idx(".logo").css("color", "black");
        idx(".hamburger div").css("background-color", "black");
        idx(".header__link div").css("background-color", "black");
      } else {
        idx("#header").css("background-color", "transparent");
        idx(".link").css("color", "white");
        idx(".logo").css("color", "white");
        idx("#header").css("box-shadow", "none");
        idx(".header__link div").css("background-color", "white");
      }
    });
  }

  const countyIdMap = {
    allegheny: 696,
    butler: 1058,
    beaver: 678,
    westmoreland: 330,
    washington: 719
  };

  const neighborhoodMap = [
    {
      id: "Adamsburg",
      text: "Adamsburg"
    },
    {
      id: "Albion",
      text: "Albion"
    },
    {
      id: "Aliquippa",
      text: "Aliquippa"
    },
    {
      id: "Allentown",
      text: "Allentown"
    },
    {
      id: "Ambridge",
      text: "Ambridge"
    },
    {
      id: "Amwell",
      text: "Amwell"
    },
    {
      id: "Arlington",
      text: "Arlington"
    },
    {
      id: "Armstrong Shelocta",
      text: "Armstrong Shelocta"
    },
    {
      id: "Arnold",
      text: "Arnold"
    },
    {
      id: "Aspinwall",
      text: "Aspinwall"
    },
    {
      id: "Avalon",
      text: "Avalon"
    },
    {
      id: "Avella",
      text: "Avella"
    },
    {
      id: "Baden",
      text: "Baden"
    },
    {
      id: "Banksville Westwood",
      text: "Banksville Westwood"
    },
    {
      id: "Barkeyville",
      text: "Barkeyville"
    },
    {
      id: "Beallsville",
      text: "Beallsville"
    },
    {
      id: "Beaver",
      text: "Beaver"
    },
    {
      id: "Beaver-CRA",
      text: "Beaver-CRA"
    },
    {
      id: "Beechview",
      text: "Beechview"
    },
    {
      id: "Bellevue",
      text: "Bellevue"
    },
    {
      id: "Beltzhoover",
      text: "Beltzhoover"
    },
    {
      id: "Bentleyville",
      text: "Bentleyville"
    },
    {
      id: "Berlin",
      text: "Berlin"
    },
    {
      id: "Bessemer",
      text: "Bessemer"
    },
    {
      id: "Blackridge",
      text: "Blackridge"
    },
    {
      id: "Blawnox",
      text: "Blawnox"
    },
    {
      id: "Bloomfield",
      text: "Bloomfield"
    },
    {
      id: "Bloomfield-CRA",
      text: "Bloomfield-CRA"
    },
    {
      id: "Bobtown Dilliner",
      text: "Bobtown Dilliner"
    },
    {
      id: "Brackenridge",
      text: "Brackenridge"
    },
    {
      id: "Braddock",
      text: "Braddock"
    },
    {
      id: "Brentwood",
      text: "Brentwood"
    },
    {
      id: "Bridgeville",
      text: "Bridgeville"
    },
    {
      id: "Bridgewater",
      text: "Bridgewater"
    },
    {
      id: "Brookline",
      text: "Brookline"
    },
    {
      id: "Brownsville",
      text: "Brownsville"
    },
    {
      id: "Burrel Blacklick",
      text: "Burrel Blacklick"
    },
    {
      id: "California",
      text: "California"
    },
    {
      id: "Callensburg",
      text: "Callensburg"
    },
    {
      id: "Canonsburg",
      text: "Canonsburg"
    },
    {
      id: "Carmichaels Cumblnd",
      text: "Carmichaels Cumblnd"
    },
    {
      id: "Carnegie",
      text: "Carnegie"
    },
    {
      id: "Carrick",
      text: "Carrick"
    },
    {
      id: "Cecil",
      text: "Cecil"
    },
    {
      id: "Centerville",
      text: "Centerville"
    },
    {
      id: "Chartiers",
      text: "Chartiers"
    },
    {
      id: "Cheswick",
      text: "Cheswick"
    },
    {
      id: "Clairton",
      text: "Clairton"
    },
    {
      id: "Clarion",
      text: "Clarion"
    },
    {
      id: "Clarksville",
      text: "Clarksville"
    },
    {
      id: "Claysville",
      text: "Claysville"
    },
    {
      id: "Clintonville",
      text: "Clintonville"
    },
    {
      id: "Cokeburg",
      text: "Cokeburg"
    },
    {
      id: "Conneautville",
      text: "Conneautville"
    },
    {
      id: "Connellsville",
      text: "Connellsville"
    },
    {
      id: "Conway",
      text: "Conway"
    },
    {
      id: "Cooperstown",
      text: "Cooperstown"
    },
    {
      id: "Coraopolis",
      text: "Coraopolis"
    },
    {
      id: "Corry",
      text: "Corry"
    },
    {
      id: "Cowansville",
      text: "Cowansville"
    },
    {
      id: "Crafton",
      text: "Crafton"
    },
    {
      id: "Crucible",
      text: "Crucible"
    },
    {
      id: "Darlington",
      text: "Darlington"
    },
    {
      id: "Dawson",
      text: "Dawson"
    },
    {
      id: "Delmont",
      text: "Delmont"
    },
    {
      id: "Donora",
      text: "Donora"
    },
    {
      id: "Dormont",
      text: "Dormont"
    },
    {
      id: "Dravosburg",
      text: "Dravosburg"
    },
    {
      id: "Dunbar",
      text: "Dunbar"
    },
    {
      id: "Duquesne",
      text: "Duquesne"
    },
    {
      id: "Eastvale",
      text: "Eastvale"
    },
    {
      id: "Economy",
      text: "Economy"
    },
    {
      id: "Edgewood",
      text: "Edgewood"
    },
    {
      id: "Edgeworth",
      text: "Edgeworth"
    },
    {
      id: "Edinboro",
      text: "Edinboro"
    },
    {
      id: "Elliott",
      text: "Elliott"
    },
    {
      id: "Emsworth",
      text: "Emsworth"
    },
    {
      id: "Espyville",
      text: "Espyville"
    },
    {
      id: "Etna",
      text: "Etna"
    },
    {
      id: "Everson",
      text: "Everson"
    },
    {
      id: "Export",
      text: "Export"
    },
    {
      id: "Fairchance",
      text: "Fairchance"
    },
    {
      id: "Fallowfield",
      text: "Fallowfield"
    },
    {
      id: "Fallston",
      text: "Fallston"
    },
    {
      id: "Farmington",
      text: "Farmington"
    },
    {
      id: "Farrell",
      text: "Farrell"
    },
    {
      id: "Fineview",
      text: "Fineview"
    },
    {
      id: "Finleyville",
      text: "Finleyville"
    },
    {
      id: "Fisher",
      text: "Fisher"
    },
    {
      id: "Foxburg",
      text: "Foxburg"
    },
    {
      id: "Frazer",
      text: "Frazer"
    },
    {
      id: "Fredonia",
      text: "Fredonia"
    },
    {
      id: "Freedom",
      text: "Freedom"
    },
    {
      id: "Garfield",
      text: "Garfield"
    },
    {
      id: "Georgetown",
      text: "Georgetown"
    },
    {
      id: "Glassport",
      text: "Glassport"
    },
    {
      id: "Glenfield",
      text: "Glenfield"
    },
    {
      id: "Graysville",
      text: "Graysville"
    },
    {
      id: "Green Commdre Prchse",
      text: "Green Commdre Prchse"
    },
    {
      id: "Greenfield",
      text: "Greenfield"
    },
    {
      id: "Greensboro",
      text: "Greensboro"
    },
    {
      id: "Greentree",
      text: "Greentree"
    },
    {
      id: "Greenwood",
      text: "Greenwood"
    },
    {
      id: "Hampton",
      text: "Hampton"
    },
    {
      id: "Harmar",
      text: "Harmar"
    },
    {
      id: "Hawthorne",
      text: "Hawthorne"
    },
    {
      id: "Hayfield",
      text: "Hayfield"
    },
    {
      id: "Hazelwood",
      text: "Hazelwood"
    },
    {
      id: "Heidelberg",
      text: "Heidelberg"
    },
    {
      id: "Hermitage",
      text: "Hermitage"
    },
    {
      id: "Holbrook",
      text: "Holbrook"
    },
    {
      id: "Homestead",
      text: "Homestead"
    },
    {
      id: "Homewood",
      text: "Homewood"
    },
    {
      id: "Homewood-Brushton",
      text: "Homewood-Brushton"
    },
    {
      id: "Hookstown",
      text: "Hookstown"
    },
    {
      id: "Houston",
      text: "Houston"
    },
    {
      id: "Hunker",
      text: "Hunker"
    },
    {
      id: "Imperial",
      text: "Imperial"
    },
    {
      id: "Industry",
      text: "Industry"
    },
    {
      id: "Ingram",
      text: "Ingram"
    },
    {
      id: "Irwin",
      text: "Irwin"
    },
    {
      id: "Jamestown",
      text: "Jamestown"
    },
    {
      id: "Jeannette",
      text: "Jeannette"
    },
    {
      id: "Jefferson",
      text: "Jefferson"
    },
    {
      id: "Jefferson Mather",
      text: "Jefferson Mather"
    },
    {
      id: "Knox",
      text: "Knox"
    },
    {
      id: "Knoxville",
      text: "Knoxville"
    },
    {
      id: "Koppel",
      text: "Koppel"
    },
    {
      id: "Latrobe",
      text: "Latrobe"
    },
    {
      id: "Lawrenceville",
      text: "Lawrenceville"
    },
    {
      id: "Leeper",
      text: "Leeper"
    },
    {
      id: "Leetsdale",
      text: "Leetsdale"
    },
    {
      id: "Lickingville",
      text: "Lickingville"
    },
    {
      id: "Lincoln-Larimer",
      text: "Lincoln-Larimer"
    },
    {
      id: "Loyalhanna",
      text: "Loyalhanna"
    },
    {
      id: "Manchester",
      text: "Manchester"
    },
    {
      id: "Manor",
      text: "Manor"
    },
    {
      id: "Mapletown",
      text: "Mapletown"
    },
    {
      id: "Markleysburg",
      text: "Markleysburg"
    },
    {
      id: "Marshall",
      text: "Marshall"
    },
    {
      id: "Masontown",
      text: "Masontown"
    },
    {
      id: "McCandless",
      text: "McCandless"
    },
    {
      id: "McClellandtown",
      text: "McClellandtown"
    },
    {
      id: "McKeesport",
      text: "McKeesport"
    },
    {
      id: "Meadowlands",
      text: "Meadowlands"
    },
    {
      id: "Midway",
      text: "Midway"
    },
    {
      id: "Millvale",
      text: "Millvale"
    },
    {
      id: "Monaca",
      text: "Monaca"
    },
    {
      id: "Monessen",
      text: "Monessen"
    },
    {
      id: "Monongahela",
      text: "Monongahela"
    },
    {
      id: "Monroeville",
      text: "Monroeville"
    },
    {
      id: "Montgomery Grant",
      text: "Montgomery Grant"
    },
    {
      id: "Morningside",
      text: "Morningside"
    },
    {
      id: "Munhall",
      text: "Munhall"
    },
    {
      id: "Murrysville",
      text: "Murrysville"
    },
    {
      id: "Natrona",
      text: "Natrona"
    },
    {
      id: "Nemacolin",
      text: "Nemacolin"
    },
    {
      id: "Newell",
      text: "Newell"
    },
    {
      id: "Nottingham",
      text: "Nottingham"
    },
    {
      id: "O'Hara",
      text: "O'Hara"
    },
    {
      id: "Oakdale",
      text: "Oakdale"
    },
    {
      id: "Oakland",
      text: "Oakland"
    },
    {
      id: "Oakmont",
      text: "Oakmont"
    },
    {
      id: "Ohiopyle",
      text: "Ohiopyle"
    },
    {
      id: "Ohioville",
      text: "Ohioville"
    },
    {
      id: "Overbrook",
      text: "Overbrook"
    },
    {
      id: "Pennsbury",
      text: "Pennsbury"
    },
    {
      id: "Perryopolis",
      text: "Perryopolis"
    },
    {
      id: "Pine-CRA",
      text: "Pine-CRA"
    },
    {
      id: "Pitcairn",
      text: "Pitcairn"
    },
    {
      id: "Randolph",
      text: "Randolph"
    },
    {
      id: "Rankin",
      text: "Rankin"
    },
    {
      id: "Republic",
      text: "Republic"
    },
    {
      id: "Reserve",
      text: "Reserve"
    },
    {
      id: "Richland",
      text: "Richland"
    },
    {
      id: "Richmond",
      text: "Richmond"
    },
    {
      id: "Rimersburg",
      text: "Rimersburg"
    },
    {
      id: "Rochester",
      text: "Rochester"
    },
    {
      id: "Rogersville",
      text: "Rogersville"
    },
    {
      id: "Rome",
      text: "Rome"
    },
    {
      id: "Roscoe",
      text: "Roscoe"
    },
    {
      id: "Rostraver",
      text: "Rostraver"
    },
    {
      id: "Saegertown",
      text: "Saegertown"
    },
    {
      id: "Scottdale",
      text: "Scottdale"
    },
    {
      id: "Sewickley",
      text: "Sewickley"
    },
    {
      id: "Shadyside",
      text: "Shadyside"
    },
    {
      id: "Shaler",
      text: "Shaler"
    },
    {
      id: "Sharon",
      text: "Sharon"
    },
    {
      id: "Sharpsburg",
      text: "Sharpsburg"
    },
    {
      id: "Sharpsville",
      text: "Sharpsville"
    },
    {
      id: "Sheakleyville",
      text: "Sheakleyville"
    },
    {
      id: "Shenango-CRA",
      text: "Shenango-CRA"
    },
    {
      id: "Sheraden",
      text: "Sheraden"
    },
    {
      id: "Shippenville",
      text: "Shippenville"
    },
    {
      id: "Shippingport",
      text: "Shippingport"
    },
    {
      id: "Sligo",
      text: "Sligo"
    },
    {
      id: "Smith",
      text: "Smith"
    },
    {
      id: "Smithfield",
      text: "Smithfield"
    },
    {
      id: "Smithton",
      text: "Smithton"
    },
    {
      id: "Spara",
      text: "Spara"
    },
    {
      id: "Spring",
      text: "Spring"
    },
    {
      id: "Springfield",
      text: "Springfield"
    },
    {
      id: "Stockdale",
      text: "Stockdale"
    },
    {
      id: "Stoneboro",
      text: "Stoneboro"
    },
    {
      id: "Stuben",
      text: "Stuben"
    },
    {
      id: "Sutersville",
      text: "Sutersville"
    },
    {
      id: "Swissvale",
      text: "Swissvale"
    },
    {
      id: "Tarentum",
      text: "Tarentum"
    },
    {
      id: "Templeton",
      text: "Templeton"
    },
    {
      id: "Thornburg",
      text: "Thornburg"
    },
    {
      id: "Titusville",
      text: "Titusville"
    },
    {
      id: "Trafford",
      text: "Trafford"
    },
    {
      id: "Troy",
      text: "Troy"
    },
    {
      id: "Uniontown",
      text: "Uniontown"
    },
    {
      id: "Vanderbilt",
      text: "Vanderbilt"
    },
    {
      id: "Vanport",
      text: "Vanport"
    },
    {
      id: "Verona",
      text: "Verona"
    },
    {
      id: "Wampum",
      text: "Wampum"
    },
    {
      id: "Washington Creekside",
      text: "Washington Creekside"
    },
    {
      id: "Waterford",
      text: "Waterford"
    },
    {
      id: "Wattsburg",
      text: "Wattsburg"
    },
    {
      id: "Wheatland",
      text: "Wheatland"
    },
    {
      id: "Whitaker",
      text: "Whitaker"
    },
    {
      id: "Whitehall",
      text: "Whitehall"
    },
    {
      id: "Wilkinsburg",
      text: "Wilkinsburg"
    },
    {
      id: "Wilmerding",
      text: "Wilmerding"
    },
    {
      id: "Woodcock",
      text: "Woodcock"
    },
    {
      id: "Worthington",
      text: "Worthington"
    },
    {
      id: "Youngwood",
      text: "Youngwood"
    },
    {
      id: "Adams Twp",
      text: "Adams Twp"
    },
    {
      id: "Addison Boro",
      text: "Addison Boro"
    },
    {
      id: "Addison Twp",
      text: "Addison Twp"
    },
    {
      id: "Aleppo - GRE",
      text: "Aleppo - GRE"
    },
    {
      id: "Aleppo - NAL",
      text: "Aleppo - NAL"
    },
    {
      id: "Allegheny Twp - BUT",
      text: "Allegheny Twp - BUT"
    },
    {
      id: "Allegheny Twp - SOM",
      text: "Allegheny Twp - SOM"
    },
    {
      id: "Allegheny Twp - WML",
      text: "Allegheny Twp - WML"
    },
    {
      id: "Allegheny West",
      text: "Allegheny West"
    },
    {
      id: "Allenport Boro",
      text: "Allenport Boro"
    },
    {
      id: "Apollo Boro",
      text: "Apollo Boro"
    },
    {
      id: "Applewood Borough",
      text: "Applewood Borough"
    },
    {
      id: "Baldwin Boro",
      text: "Baldwin Boro"
    },
    {
      id: "Baldwin Twp",
      text: "Baldwin Twp"
    },
    {
      id: "Beaver Falls",
      text: "Beaver Falls"
    },
    {
      id: "Bell Acres",
      text: "Bell Acres"
    },
    {
      id: "Bell Twp",
      text: "Bell Twp"
    },
    {
      id: "Belle Vernon - FAY",
      text: "Belle Vernon - FAY"
    },
    {
      id: "Belle Vernon - WML",
      text: "Belle Vernon - WML"
    },
    {
      id: "Ben Avon",
      text: "Ben Avon"
    },
    {
      id: "Ben Avon Heights",
      text: "Ben Avon Heights"
    },
    {
      id: "Benson Boro",
      text: "Benson Boro"
    },
    {
      id: "Bethel Park",
      text: "Bethel Park"
    },
    {
      id: "Bethel Twp",
      text: "Bethel Twp"
    },
    {
      id: "Big Beaver",
      text: "Big Beaver"
    },
    {
      id: "Bigelow Heights",
      text: "Bigelow Heights"
    },
    {
      id: "Black Twp",
      text: "Black Twp"
    },
    {
      id: "Blacklick Valley School District",
      text: "Blacklick Valley School District"
    },
    {
      id: "Blaine Twp",
      text: "Blaine Twp"
    },
    {
      id: "Blairsville Area",
      text: "Blairsville Area"
    },
    {
      id: "Boggs Twp",
      text: "Boggs Twp"
    },
    {
      id: "Bon Air",
      text: "Bon Air"
    },
    {
      id: "Boswell Boro",
      text: "Boswell Boro"
    },
    {
      id: "Braddock Hills",
      text: "Braddock Hills"
    },
    {
      id: "Bradford Woods",
      text: "Bradford Woods"
    },
    {
      id: "Brady Twp - BUT",
      text: "Brady Twp - BUT"
    },
    {
      id: "Brady's Bend Twp",
      text: "Brady's Bend Twp"
    },
    {
      id: "Brighton Heights",
      text: "Brighton Heights"
    },
    {
      id: "Brighton Twp",
      text: "Brighton Twp"
    },
    {
      id: "Brockway Area School District",
      text: "Brockway Area School District"
    },
    {
      id: "Brookville Area School District",
      text: "Brookville Area School District"
    },
    {
      id: "Brothersvalley Twp",
      text: "Brothersvalley Twp"
    },
    {
      id: "Bruin Boro",
      text: "Bruin Boro"
    },
    {
      id: "Brush Val Buffington",
      text: "Brush Val Buffington"
    },
    {
      id: "Buffalo Twp - BUT",
      text: "Buffalo Twp - BUT"
    },
    {
      id: "Buffalo Twp - WSH",
      text: "Buffalo Twp - WSH"
    },
    {
      id: "Bullskin Twp",
      text: "Bullskin Twp"
    },
    {
      id: "Burgettstown Boro",
      text: "Burgettstown Boro"
    },
    {
      id: "Burrell Twp",
      text: "Burrell Twp"
    },
    {
      id: "Cadogan Twp",
      text: "Cadogan Twp"
    },
    {
      id: "Calbride Place",
      text: "Calbride Place"
    },
    {
      id: "Callery Boro",
      text: "Callery Boro"
    },
    {
      id: "Cambria Heights School District",
      text: "Cambria Heights School District"
    },
    {
      id: "Cambridge Springs",
      text: "Cambridge Springs"
    },
    {
      id: "Canadohta Lake",
      text: "Canadohta Lake"
    },
    {
      id: "Canal Twp",
      text: "Canal Twp"
    },
    {
      id: "Canoe Banks Twps",
      text: "Canoe Banks Twps"
    },
    {
      id: "Canton Twp",
      text: "Canton Twp"
    },
    {
      id: "Carroll Twp.",
      text: "Carroll Twp."
    },
    {
      id: "Castle Shannon",
      text: "Castle Shannon"
    },
    {
      id: "Center Twp - BEA",
      text: "Center Twp - BEA"
    },
    {
      id: "Center Twp - BUT",
      text: "Center Twp - BUT"
    },
    {
      id: "Center Twp Homer Cty",
      text: "Center Twp Homer Cty"
    },
    {
      id: "Central Cambria School District",
      text: "Central Cambria School District"
    },
    {
      id: "Central City Borough",
      text: "Central City Borough"
    },
    {
      id: "Central North Side",
      text: "Central North Side"
    },
    {
      id: "Chalfant Boro",
      text: "Chalfant Boro"
    },
    {
      id: "Charleroi Boro",
      text: "Charleroi Boro"
    },
    {
      id: "Chartiers City",
      text: "Chartiers City"
    },
    {
      id: "Cherry Twp",
      text: "Cherry Twp"
    },
    {
      id: "Cherry Valley - WSH",
      text: "Cherry Valley - WSH"
    },
    {
      id: "Cherryhll Twp Clymer",
      text: "Cherryhll Twp Clymer"
    },
    {
      id: "Chicora Boro",
      text: "Chicora Boro"
    },
    {
      id: "Chippewa Twp",
      text: "Chippewa Twp"
    },
    {
      id: "Churchill Boro",
      text: "Churchill Boro"
    },
    {
      id: "City of But NE",
      text: "City of But NE"
    },
    {
      id: "City of But NW",
      text: "City of But NW"
    },
    {
      id: "City of But SE",
      text: "City of But SE"
    },
    {
      id: "City of But SW",
      text: "City of But SW"
    },
    {
      id: "City of Franklin",
      text: "City of Franklin"
    },
    {
      id: "City of Greensburg",
      text: "City of Greensburg"
    },
    {
      id: "City of Washington",
      text: "City of Washington"
    },
    {
      id: "Clarion-Limestone Area School District",
      text: "Clarion-Limestone Area School District"
    },
    {
      id: "Clark Boro",
      text: "Clark Boro"
    },
    {
      id: "Clay Twp",
      text: "Clay Twp"
    },
    {
      id: "Clearfield Area School District",
      text: "Clearfield Area School District"
    },
    {
      id: "Clearfield Twp",
      text: "Clearfield Twp"
    },
    {
      id: "Clinton Twp",
      text: "Clinton Twp"
    },
    {
      id: "Coal Center Boro",
      text: "Coal Center Boro"
    },
    {
      id: "Cochranton Boro",
      text: "Cochranton Boro"
    },
    {
      id: "Collier Twp",
      text: "Collier Twp"
    },
    {
      id: "Concord Twp",
      text: "Concord Twp"
    },
    {
      id: "Conemaugh Twp - SOM",
      text: "Conemaugh Twp - SOM"
    },
    {
      id: "Conemaugh Valley School District",
      text: "Conemaugh Valley School District"
    },
    {
      id: "Conemaugh Young Twps - IND",
      text: "Conemaugh Young Twps - IND"
    },
    {
      id: "Confluence Boro",
      text: "Confluence Boro"
    },
    {
      id: "Conneaut Lake - CRA",
      text: "Conneaut Lake - CRA"
    },
    {
      id: "Conneaut Twp",
      text: "Conneaut Twp"
    },
    {
      id: "Connoquenessing Boro",
      text: "Connoquenessing Boro"
    },
    {
      id: "Connoquenessing Twp",
      text: "Connoquenessing Twp"
    },
    {
      id: "Cook Twp",
      text: "Cook Twp"
    },
    {
      id: "Coolspring Twp",
      text: "Coolspring Twp"
    },
    {
      id: "Cornplanter Twp",
      text: "Cornplanter Twp"
    },
    {
      id: "Cowanshanock Twp",
      text: "Cowanshanock Twp"
    },
    {
      id: "Crafton Heights",
      text: "Crafton Heights"
    },
    {
      id: "Cranberry Twp",
      text: "Cranberry Twp"
    },
    {
      id: "Cranberry Twp - VEN",
      text: "Cranberry Twp - VEN"
    },
    {
      id: "Cranesville Borough",
      text: "Cranesville Borough"
    },
    {
      id: "Cross Creek Twp",
      text: "Cross Creek Twp"
    },
    {
      id: "Curwensville Area School District",
      text: "Curwensville Area School District"
    },
    {
      id: "Darlngtn Twp",
      text: "Darlngtn Twp"
    },
    {
      id: "Daugherty Twp",
      text: "Daugherty Twp"
    },
    {
      id: "Dayton Boro",
      text: "Dayton Boro"
    },
    {
      id: "Deemston Boro",
      text: "Deemston Boro"
    },
    {
      id: "Deer Creek Twp",
      text: "Deer Creek Twp"
    },
    {
      id: "Delaware Twp",
      text: "Delaware Twp"
    },
    {
      id: "Derry Boro",
      text: "Derry Boro"
    },
    {
      id: "Derry Twp",
      text: "Derry Twp"
    },
    {
      id: "Donegal - WML",
      text: "Donegal - WML"
    },
    {
      id: "Donegal Twp - BUT",
      text: "Donegal Twp - BUT"
    },
    {
      id: "Donegal Twp - WSH",
      text: "Donegal Twp - WSH"
    },
    {
      id: "Downtown Pgh",
      text: "Downtown Pgh"
    },
    {
      id: "Dry Tav Rices Landing",
      text: "Dry Tav Rices Landing"
    },
    {
      id: "Dubois Area School District",
      text: "Dubois Area School District"
    },
    {
      id: "Dunbar Twp",
      text: "Dunbar Twp"
    },
    {
      id: "E Butler Boro",
      text: "E Butler Boro"
    },
    {
      id: "E Lackawannock Twp",
      text: "E Lackawannock Twp"
    },
    {
      id: "E Mahoning Marion Ctr",
      text: "E Mahoning Marion Ctr"
    },
    {
      id: "E Pittsburgh",
      text: "E Pittsburgh"
    },
    {
      id: "E Washington Boro",
      text: "E Washington Boro"
    },
    {
      id: "E W Wheatfield Twp",
      text: "E W Wheatfield Twp"
    },
    {
      id: "East Allegheny",
      text: "East Allegheny"
    },
    {
      id: "East Bethlehem",
      text: "East Bethlehem"
    },
    {
      id: "East Brady",
      text: "East Brady"
    },
    {
      id: "East Deer",
      text: "East Deer"
    },
    {
      id: "East Fairfield",
      text: "East Fairfield"
    },
    {
      id: "East Finley",
      text: "East Finley"
    },
    {
      id: "East Franklin Twp",
      text: "East Franklin Twp"
    },
    {
      id: "East Huntingdon",
      text: "East Huntingdon"
    },
    {
      id: "East Liberty",
      text: "East Liberty"
    },
    {
      id: "East McKeesport",
      text: "East McKeesport"
    },
    {
      id: "East Mead Twp",
      text: "East Mead Twp"
    },
    {
      id: "East Rochester",
      text: "East Rochester"
    },
    {
      id: "East Vandergrift",
      text: "East Vandergrift"
    },
    {
      id: "East-Other Area",
      text: "East-Other Area"
    },
    {
      id: "Eau Claire Boro",
      text: "Eau Claire Boro"
    },
    {
      id: "Elderton Boro",
      text: "Elderton Boro"
    },
    {
      id: "Elizabeth Twp Boro",
      text: "Elizabeth Twp Boro"
    },
    {
      id: "Elk Lick Twp",
      text: "Elk Lick Twp"
    },
    {
      id: "Ellport Borough",
      text: "Ellport Borough"
    },
    {
      id: "Ellsworth Boro",
      text: "Ellsworth Boro"
    },
    {
      id: "Ellwood City - BEA",
      text: "Ellwood City - BEA"
    },
    {
      id: "Ellwood City - LAW",
      text: "Ellwood City - LAW"
    },
    {
      id: "Emlenton Boro",
      text: "Emlenton Boro"
    },
    {
      id: "Erie City",
      text: "Erie City"
    },
    {
      id: "Evans City Boro",
      text: "Evans City Boro"
    },
    {
      id: "Fairfield Twp",
      text: "Fairfield Twp"
    },
    {
      id: "Fairfield Twp - CRA",
      text: "Fairfield Twp - CRA"
    },
    {
      id: "Fairhope Twp",
      text: "Fairhope Twp"
    },
    {
      id: "Fairview Boro - ERI",
      text: "Fairview Boro - ERI"
    },
    {
      id: "Fairview Twp - BUT",
      text: "Fairview Twp - BUT"
    },
    {
      id: "Fairview Twp - ERI",
      text: "Fairview Twp - ERI"
    },
    {
      id: "Fairview Twp - MER",
      text: "Fairview Twp - MER"
    },
    {
      id: "Fallowfield Twp.",
      text: "Fallowfield Twp."
    },
    {
      id: "Fawn Twp",
      text: "Fawn Twp"
    },
    {
      id: "Fayette City",
      text: "Fayette City"
    },
    {
      id: "Ferndale Area School District",
      text: "Ferndale Area School District"
    },
    {
      id: "Findlay Twp",
      text: "Findlay Twp"
    },
    {
      id: "Findley Twp",
      text: "Findley Twp"
    },
    {
      id: "Ford City Boro",
      text: "Ford City Boro"
    },
    {
      id: "Ford Cliff Boro",
      text: "Ford Cliff Boro"
    },
    {
      id: "Forest Hills Boro",
      text: "Forest Hills Boro"
    },
    {
      id: "Forest Hills School District",
      text: "Forest Hills School District"
    },
    {
      id: "Forward Twp - BUT",
      text: "Forward Twp - BUT"
    },
    {
      id: "Forward Twp - EAL",
      text: "Forward Twp - EAL"
    },
    {
      id: "Fox Chapel",
      text: "Fox Chapel"
    },
    {
      id: "Frankfort Springs",
      text: "Frankfort Springs"
    },
    {
      id: "Franklin Park",
      text: "Franklin Park"
    },
    {
      id: "Franklin Twp",
      text: "Franklin Twp"
    },
    {
      id: "Franklin Twp - BUT",
      text: "Franklin Twp - BUT"
    },
    {
      id: "Franklin Twp - ERI",
      text: "Franklin Twp - ERI"
    },
    {
      id: "Franklin Twp - FAY",
      text: "Franklin Twp - FAY"
    },
    {
      id: "Freeport Boro",
      text: "Freeport Boro"
    },
    {
      id: "French Creek Twp",
      text: "French Creek Twp"
    },
    {
      id: "Frenchcreek Twp",
      text: "Frenchcreek Twp"
    },
    {
      id: "Friendship Park",
      text: "Friendship Park"
    },
    {
      id: "Garret Boro",
      text: "Garret Boro"
    },
    {
      id: "Georges Twp",
      text: "Georges Twp"
    },
    {
      id: "German Twp",
      text: "German Twp"
    },
    {
      id: "Gilpin Twp",
      text: "Gilpin Twp"
    },
    {
      id: "Girard Borough",
      text: "Girard Borough"
    },
    {
      id: "Girard Twp",
      text: "Girard Twp"
    },
    {
      id: "Glendale Area School District",
      text: "Glendale Area School District"
    },
    {
      id: "Greater Johnstown School District",
      text: "Greater Johnstown School District"
    },
    {
      id: "Green Twp",
      text: "Green Twp"
    },
    {
      id: "Greene Twp",
      text: "Greene Twp"
    },
    {
      id: "Greenfield Twp",
      text: "Greenfield Twp"
    },
    {
      id: "Greenville Boro - MER",
      text: "Greenville Boro - MER"
    },
    {
      id: "Grove City Boro",
      text: "Grove City Boro"
    },
    {
      id: "Guys Mills",
      text: "Guys Mills"
    },
    {
      id: "Hanover Twp - BEA",
      text: "Hanover Twp - BEA"
    },
    {
      id: "Hanover Twp - WSH",
      text: "Hanover Twp - WSH"
    },
    {
      id: "Harborcreek Twp",
      text: "Harborcreek Twp"
    },
    {
      id: "Harmony Area School District",
      text: "Harmony Area School District"
    },
    {
      id: "Harmony Boro - BUT",
      text: "Harmony Boro - BUT"
    },
    {
      id: "Harmony Twp - BEA",
      text: "Harmony Twp - BEA"
    },
    {
      id: "Harrisville Boro",
      text: "Harrisville Boro"
    },
    {
      id: "Hempfield Twp - MER",
      text: "Hempfield Twp - MER"
    },
    {
      id: "Hempfield Twp - WML",
      text: "Hempfield Twp - WML"
    },
    {
      id: "Henry Clay Twp",
      text: "Henry Clay Twp"
    },
    {
      id: "Hickory Twp",
      text: "Hickory Twp"
    },
    {
      id: "Hidden Valley",
      text: "Hidden Valley"
    },
    {
      id: "Highland Park",
      text: "Highland Park"
    },
    {
      id: "Hill District",
      text: "Hill District"
    },
    {
      id: "Hooversville Boro",
      text: "Hooversville Boro"
    },
    {
      id: "Hopewell - WSH",
      text: "Hopewell - WSH"
    },
    {
      id: "Hopewell Twp - BEA",
      text: "Hopewell Twp - BEA"
    },
    {
      id: "Hyde Park",
      text: "Hyde Park"
    },
    {
      id: "Independence - BEA",
      text: "Independence - BEA"
    },
    {
      id: "Independence - WSH",
      text: "Independence - WSH"
    },
    {
      id: "Indian Lake Boro",
      text: "Indian Lake Boro"
    },
    {
      id: "Indiana Boro - IND",
      text: "Indiana Boro - IND"
    },
    {
      id: "Indiana TWP - NAL",
      text: "Indiana TWP - NAL"
    },
    {
      id: "Irwin Twp",
      text: "Irwin Twp"
    },
    {
      id: "Jackson Center Boro",
      text: "Jackson Center Boro"
    },
    {
      id: "Jackson Twp - BUT",
      text: "Jackson Twp - BUT"
    },
    {
      id: "Jackson Twp - MER",
      text: "Jackson Twp - MER"
    },
    {
      id: "Jackson Twp - VEN",
      text: "Jackson Twp - VEN"
    },
    {
      id: "Jamestown - CRA",
      text: "Jamestown - CRA"
    },
    {
      id: "Jefferson Hills",
      text: "Jefferson Hills"
    },
    {
      id: "Jefferson Twp - BUT",
      text: "Jefferson Twp - BUT"
    },
    {
      id: "Jefferson Twp - FAY",
      text: "Jefferson Twp - FAY"
    },
    {
      id: "Jefferson Twp - MER",
      text: "Jefferson Twp - MER"
    },
    {
      id: "Jefferson Twp - SOM",
      text: "Jefferson Twp - SOM"
    },
    {
      id: "Jenner Twp",
      text: "Jenner Twp"
    },
    {
      id: "Jennerstown Boro",
      text: "Jennerstown Boro"
    },
    {
      id: "Karns City Boro",
      text: "Karns City Boro"
    },
    {
      id: "Kennedy Twp",
      text: "Kennedy Twp"
    },
    {
      id: "Kilbuck Twp",
      text: "Kilbuck Twp"
    },
    {
      id: "Kirby Mt.Morris",
      text: "Kirby Mt.Morris"
    },
    {
      id: "Kiskiminetas Twp",
      text: "Kiskiminetas Twp"
    },
    {
      id: "Kittanning Boro",
      text: "Kittanning Boro"
    },
    {
      id: "Kittanning Twp",
      text: "Kittanning Twp"
    },
    {
      id: "Lackawannock Twp",
      text: "Lackawannock Twp"
    },
    {
      id: "Lake City",
      text: "Lake City"
    },
    {
      id: "Lake Stonycreek",
      text: "Lake Stonycreek"
    },
    {
      id: "Lake Twp",
      text: "Lake Twp"
    },
    {
      id: "Lancaster Twp",
      text: "Lancaster Twp"
    },
    {
      id: "Larimer Twp",
      text: "Larimer Twp"
    },
    {
      id: "Lawrence Park Twp",
      text: "Lawrence Park Twp"
    },
    {
      id: "Leechburg Boro",
      text: "Leechburg Boro"
    },
    {
      id: "Leet Twp",
      text: "Leet Twp"
    },
    {
      id: "Level Green",
      text: "Level Green"
    },
    {
      id: "Liberty Boro",
      text: "Liberty Boro"
    },
    {
      id: "Liberty Twp",
      text: "Liberty Twp"
    },
    {
      id: "Ligonier Boro",
      text: "Ligonier Boro"
    },
    {
      id: "Ligonier Twp",
      text: "Ligonier Twp"
    },
    {
      id: "Lincoln Boro",
      text: "Lincoln Boro"
    },
    {
      id: "Lincoln Place",
      text: "Lincoln Place"
    },
    {
      id: "Lincoln Twp",
      text: "Lincoln Twp"
    },
    {
      id: "Linesville Boro",
      text: "Linesville Boro"
    },
    {
      id: "Little Beaver Twp",
      text: "Little Beaver Twp"
    },
    {
      id: "Long Branch Boro",
      text: "Long Branch Boro"
    },
    {
      id: "Lower Burrell",
      text: "Lower Burrell"
    },
    {
      id: "Lower Turkeyfoot Twp",
      text: "Lower Turkeyfoot Twp"
    },
    {
      id: "Lower Tyrone Twp",
      text: "Lower Tyrone Twp"
    },
    {
      id: "Luzerne Twp",
      text: "Luzerne Twp"
    },
    {
      id: "Madison Twp",
      text: "Madison Twp"
    },
    {
      id: "Mahoning Twp - ARM",
      text: "Mahoning Twp - ARM"
    },
    {
      id: "Mahoning Twp - LAW",
      text: "Mahoning Twp - LAW"
    },
    {
      id: "Manor Twp",
      text: "Manor Twp"
    },
    {
      id: "Manorville Boro",
      text: "Manorville Boro"
    },
    {
      id: "Marianna Boro",
      text: "Marianna Boro"
    },
    {
      id: "Marion Twp - BEA",
      text: "Marion Twp - BEA"
    },
    {
      id: "Marion Twp - BUT",
      text: "Marion Twp - BUT"
    },
    {
      id: "Mars Boro",
      text: "Mars Boro"
    },
    {
      id: "Marshall Shadeland",
      text: "Marshall Shadeland"
    },
    {
      id: "McDonald - NWA",
      text: "McDonald - NWA"
    },
    {
      id: "McDonald - WSH",
      text: "McDonald - WSH"
    },
    {
      id: "McKean Borough",
      text: "McKean Borough"
    },
    {
      id: "McKean Twp",
      text: "McKean Twp"
    },
    {
      id: "McKees Rocks",
      text: "McKees Rocks"
    },
    {
      id: "Meadville City",
      text: "Meadville City"
    },
    {
      id: "Menallen Twp",
      text: "Menallen Twp"
    },
    {
      id: "Mercer Boro - MER",
      text: "Mercer Boro - MER"
    },
    {
      id: "Mercer Twp - BUT",
      text: "Mercer Twp - BUT"
    },
    {
      id: "Meyersdale Boro",
      text: "Meyersdale Boro"
    },
    {
      id: "Middlecreek Twp",
      text: "Middlecreek Twp"
    },
    {
      id: "Middlesex Twp",
      text: "Middlesex Twp"
    },
    {
      id: "Midland Boro",
      text: "Midland Boro"
    },
    {
      id: "Milford Twp",
      text: "Milford Twp"
    },
    {
      id: "Mill Creek Twp",
      text: "Mill Creek Twp"
    },
    {
      id: "Mill Village",
      text: "Mill Village"
    },
    {
      id: "Millcreek Twp - ERI",
      text: "Millcreek Twp - ERI"
    },
    {
      id: "Mineral Twp",
      text: "Mineral Twp"
    },
    {
      id: "Monongahela City",
      text: "Monongahela City"
    },
    {
      id: "Moon Crescent Twp",
      text: "Moon Crescent Twp"
    },
    {
      id: "Morris Twp",
      text: "Morris Twp"
    },
    {
      id: "Moshannon Valley School District",
      text: "Moshannon Valley School District"
    },
    {
      id: "Mt Oliver",
      text: "Mt Oliver"
    },
    {
      id: "Mt Washington",
      text: "Mt Washington"
    },
    {
      id: "Mt. Lebanon",
      text: "Mt. Lebanon"
    },
    {
      id: "Mt. Pleasant",
      text: "Mt. Pleasant"
    },
    {
      id: "Mt. Pleasant Twp",
      text: "Mt. Pleasant Twp"
    },
    {
      id: "Muddy Creek Twp",
      text: "Muddy Creek Twp"
    },
    {
      id: "Murdoch Farms",
      text: "Murdoch Farms"
    },
    {
      id: "N Braddock",
      text: "N Braddock"
    },
    {
      id: "N Charleroi",
      text: "N Charleroi"
    },
    {
      id: "N Franklin Twp",
      text: "N Franklin Twp"
    },
    {
      id: "N Versailles",
      text: "N Versailles"
    },
    {
      id: "Natrona Hts Harrison Twp.",
      text: "Natrona Hts Harrison Twp."
    },
    {
      id: "Neshannock Twp",
      text: "Neshannock Twp"
    },
    {
      id: "Neville Twp",
      text: "Neville Twp"
    },
    {
      id: "New Alexandria",
      text: "New Alexandria"
    },
    {
      id: "New Baltimore Boro",
      text: "New Baltimore Boro"
    },
    {
      id: "New Beaver Boro",
      text: "New Beaver Boro"
    },
    {
      id: "New Bethlehem",
      text: "New Bethlehem"
    },
    {
      id: "New Brighton",
      text: "New Brighton"
    },
    {
      id: "New Castle 1st",
      text: "New Castle 1st"
    },
    {
      id: "New Castle 2nd",
      text: "New Castle 2nd"
    },
    {
      id: "New Castle 3rd",
      text: "New Castle 3rd"
    },
    {
      id: "New Castle 4th",
      text: "New Castle 4th"
    },
    {
      id: "New Castle 5th",
      text: "New Castle 5th"
    },
    {
      id: "New Castle 6th",
      text: "New Castle 6th"
    },
    {
      id: "New Castle 7th",
      text: "New Castle 7th"
    },
    {
      id: "New Castle 8th",
      text: "New Castle 8th"
    },
    {
      id: "New Centerville Boro",
      text: "New Centerville Boro"
    },
    {
      id: "New Eagle",
      text: "New Eagle"
    },
    {
      id: "New Freeport",
      text: "New Freeport"
    },
    {
      id: "New Galilee",
      text: "New Galilee"
    },
    {
      id: "New Kensington",
      text: "New Kensington"
    },
    {
      id: "New Lebanon Boro",
      text: "New Lebanon Boro"
    },
    {
      id: "New Salem",
      text: "New Salem"
    },
    {
      id: "New Sewickley Twp",
      text: "New Sewickley Twp"
    },
    {
      id: "New Stanton",
      text: "New Stanton"
    },
    {
      id: "New Vernon Twp",
      text: "New Vernon Twp"
    },
    {
      id: "New Wilmington Boro",
      text: "New Wilmington Boro"
    },
    {
      id: "Nicholson Twp",
      text: "Nicholson Twp"
    },
    {
      id: "North Apollo",
      text: "North Apollo"
    },
    {
      id: "North Beaver Twp",
      text: "North Beaver Twp"
    },
    {
      id: "North Bethlehem",
      text: "North Bethlehem"
    },
    {
      id: "North Buffalo Twp",
      text: "North Buffalo Twp"
    },
    {
      id: "North East Boro",
      text: "North East Boro"
    },
    {
      id: "North East Twp",
      text: "North East Twp"
    },
    {
      id: "North Fayette",
      text: "North Fayette"
    },
    {
      id: "North Huntingdon",
      text: "North Huntingdon"
    },
    {
      id: "North Irwin",
      text: "North Irwin"
    },
    {
      id: "North Sewickley Twp",
      text: "North Sewickley Twp"
    },
    {
      id: "North Strabane",
      text: "North Strabane"
    },
    {
      id: "North Union Twp",
      text: "North Union Twp"
    },
    {
      id: "North of Forbes",
      text: "North of Forbes"
    },
    {
      id: "North-Other Area",
      text: "North-Other Area"
    },
    {
      id: "Northern Cambria School District",
      text: "Northern Cambria School District"
    },
    {
      id: "Oakland Twp",
      text: "Oakland Twp"
    },
    {
      id: "Observatory Hill",
      text: "Observatory Hill"
    },
    {
      id: "Ohio Twp",
      text: "Ohio Twp"
    },
    {
      id: "Oil City",
      text: "Oil City"
    },
    {
      id: "Oklahoma Boro",
      text: "Oklahoma Boro"
    },
    {
      id: "Osborne Boro",
      text: "Osborne Boro"
    },
    {
      id: "Otter Creek Twp",
      text: "Otter Creek Twp"
    },
    {
      id: "Paint Twp",
      text: "Paint Twp"
    },
    {
      id: "Parker City",
      text: "Parker City"
    },
    {
      id: "Parker Twp",
      text: "Parker Twp"
    },
    {
      id: "Parks Twp",
      text: "Parks Twp"
    },
    {
      id: "Patterson Heights",
      text: "Patterson Heights"
    },
    {
      id: "Patterson Twp",
      text: "Patterson Twp"
    },
    {
      id: "Penn Cambria School District",
      text: "Penn Cambria School District"
    },
    {
      id: "Penn Hills",
      text: "Penn Hills"
    },
    {
      id: "Penn Twp - BUT",
      text: "Penn Twp - BUT"
    },
    {
      id: "Penn Twp - WML",
      text: "Penn Twp - WML"
    },
    {
      id: "Perry Hilltop",
      text: "Perry Hilltop"
    },
    {
      id: "Perry Twp - ARM",
      text: "Perry Twp - ARM"
    },
    {
      id: "Perry Twp - FAY",
      text: "Perry Twp - FAY"
    },
    {
      id: "Perry Twp - LAW",
      text: "Perry Twp - LAW"
    },
    {
      id: "Perry Twp - MER",
      text: "Perry Twp - MER"
    },
    {
      id: "Peters Twp",
      text: "Peters Twp"
    },
    {
      id: "Petrolia Boro",
      text: "Petrolia Boro"
    },
    {
      id: "Pine Bank",
      text: "Pine Bank"
    },
    {
      id: "Pine Twp - ARM",
      text: "Pine Twp - ARM"
    },
    {
      id: "Pine Twp - MER",
      text: "Pine Twp - MER"
    },
    {
      id: "Pine Twp - NAL",
      text: "Pine Twp - NAL"
    },
    {
      id: "Pine Twp Heilwood",
      text: "Pine Twp Heilwood"
    },
    {
      id: "Plain Grove Twp",
      text: "Plain Grove Twp"
    },
    {
      id: "Pleasant Hills",
      text: "Pleasant Hills"
    },
    {
      id: "Plum Boro",
      text: "Plum Boro"
    },
    {
      id: "Plumcreek Twp",
      text: "Plumcreek Twp"
    },
    {
      id: "Point Breeze",
      text: "Point Breeze"
    },
    {
      id: "Polish Hill",
      text: "Polish Hill"
    },
    {
      id: "Polk Boro",
      text: "Polk Boro"
    },
    {
      id: "Port Vue",
      text: "Port Vue"
    },
    {
      id: "Portage Area School District",
      text: "Portage Area School District"
    },
    {
      id: "Portersville Boro",
      text: "Portersville Boro"
    },
    {
      id: "Potter Twp",
      text: "Potter Twp"
    },
    {
      id: "Prospect Boro",
      text: "Prospect Boro"
    },
    {
      id: "Pt. Marion",
      text: "Pt. Marion"
    },
    {
      id: "Pulaski Twp - BEA",
      text: "Pulaski Twp - BEA"
    },
    {
      id: "Pulaski Twp - LAW",
      text: "Pulaski Twp - LAW"
    },
    {
      id: "Punxsutawney Area School District",
      text: "Punxsutawney Area School District"
    },
    {
      id: "Purchase Line School District",
      text: "Purchase Line School District"
    },
    {
      id: "Pymatuning Twp",
      text: "Pymatuning Twp"
    },
    {
      id: "Quemahoning Twp",
      text: "Quemahoning Twp"
    },
    {
      id: "Raccoon Twp",
      text: "Raccoon Twp"
    },
    {
      id: "Rayburn Twp",
      text: "Rayburn Twp"
    },
    {
      id: "Rayne Twp Ernest",
      text: "Rayne Twp Ernest"
    },
    {
      id: "Redbank Twp",
      text: "Redbank Twp"
    },
    {
      id: "Redstone Twp",
      text: "Redstone Twp"
    },
    {
      id: "Regent Square",
      text: "Regent Square"
    },
    {
      id: "Richland School District",
      text: "Richland School District"
    },
    {
      id: "Robinson Twp - NWA",
      text: "Robinson Twp - NWA"
    },
    {
      id: "Robinson Twp - WSH",
      text: "Robinson Twp - WSH"
    },
    {
      id: "Rochester Twp",
      text: "Rochester Twp"
    },
    {
      id: "Rockland Twp",
      text: "Rockland Twp"
    },
    {
      id: "Rockwood Boro",
      text: "Rockwood Boro"
    },
    {
      id: "Ross Twp",
      text: "Ross Twp"
    },
    {
      id: "Rosslyn Farms",
      text: "Rosslyn Farms"
    },
    {
      id: "Ruffs Dale",
      text: "Ruffs Dale"
    },
    {
      id: "Rural Valley Boro",
      text: "Rural Valley Boro"
    },
    {
      id: "S Mahoning Plumville",
      text: "S Mahoning Plumville"
    },
    {
      id: "Salem Twp - MER",
      text: "Salem Twp - MER"
    },
    {
      id: "Salem Twp - WML",
      text: "Salem Twp - WML"
    },
    {
      id: "Salisbury Boro",
      text: "Salisbury Boro"
    },
    {
      id: "Saltlick Twp",
      text: "Saltlick Twp"
    },
    {
      id: "Saltsburg Area",
      text: "Saltsburg Area"
    },
    {
      id: "Sandcreek Twp",
      text: "Sandcreek Twp"
    },
    {
      id: "Sandy Creek Twp",
      text: "Sandy Creek Twp"
    },
    {
      id: "Sandy Lake Boro",
      text: "Sandy Lake Boro"
    },
    {
      id: "Sandy Lake Twp",
      text: "Sandy Lake Twp"
    },
    {
      id: "Saxonburg Boro",
      text: "Saxonburg Boro"
    },
    {
      id: "Schenley Farms",
      text: "Schenley Farms"
    },
    {
      id: "Schenley Heights",
      text: "Schenley Heights"
    },
    {
      id: "Scott Twp - LAW",
      text: "Scott Twp - LAW"
    },
    {
      id: "Scott Twp - SAL",
      text: "Scott Twp - SAL"
    },
    {
      id: "Scrubgrass Twp",
      text: "Scrubgrass Twp"
    },
    {
      id: "Seven Fields Boro",
      text: "Seven Fields Boro"
    },
    {
      id: "Seven Springs",
      text: "Seven Springs"
    },
    {
      id: "Sewickley Heights",
      text: "Sewickley Heights"
    },
    {
      id: "Sewickley Hills Boro",
      text: "Sewickley Hills Boro"
    },
    {
      id: "Sewickly Twp",
      text: "Sewickly Twp"
    },
    {
      id: "Shade Twp",
      text: "Shade Twp"
    },
    {
      id: "Shenango Twp - LAW",
      text: "Shenango Twp - LAW"
    },
    {
      id: "Shenango Twp - MER",
      text: "Shenango Twp - MER"
    },
    {
      id: "Slippery Rock Boro",
      text: "Slippery Rock Boro"
    },
    {
      id: "Slippery Rock Twp - BUT",
      text: "Slippery Rock Twp - BUT"
    },
    {
      id: "Slippery Rock Twp - LAW",
      text: "Slippery Rock Twp - LAW"
    },
    {
      id: "Somerset Boro",
      text: "Somerset Boro"
    },
    {
      id: "Somerset Twp",
      text: "Somerset Twp"
    },
    {
      id: "Somerset Twp - WSH",
      text: "Somerset Twp - WSH"
    },
    {
      id: "South Beaver Twp",
      text: "South Beaver Twp"
    },
    {
      id: "South Bend Twp",
      text: "South Bend Twp"
    },
    {
      id: "South Bethelehem",
      text: "South Bethelehem"
    },
    {
      id: "South Bethlehem Borough",
      text: "South Bethlehem Borough"
    },
    {
      id: "South Buffalo Twp",
      text: "South Buffalo Twp"
    },
    {
      id: "South Connellsville",
      text: "South Connellsville"
    },
    {
      id: "South Fayette",
      text: "South Fayette"
    },
    {
      id: "South Franklin",
      text: "South Franklin"
    },
    {
      id: "South Greensburg Boro",
      text: "South Greensburg Boro"
    },
    {
      id: "South Heights",
      text: "South Heights"
    },
    {
      id: "South Huntingdon",
      text: "South Huntingdon"
    },
    {
      id: "South New Castle Boro",
      text: "South New Castle Boro"
    },
    {
      id: "South Park",
      text: "South Park"
    },
    {
      id: "South Pymatuning Twp",
      text: "South Pymatuning Twp"
    },
    {
      id: "South Side",
      text: "South Side"
    },
    {
      id: "South Strabane",
      text: "South Strabane"
    },
    {
      id: "South Union Twp",
      text: "South Union Twp"
    },
    {
      id: "Speers Boro",
      text: "Speers Boro"
    },
    {
      id: "Spring Garden",
      text: "Spring Garden"
    },
    {
      id: "Spring Hill",
      text: "Spring Hill"
    },
    {
      id: "Springdale Boro",
      text: "Springdale Boro"
    },
    {
      id: "Springdale Twp",
      text: "Springdale Twp"
    },
    {
      id: "Springfield Twp - FAY",
      text: "Springfield Twp - FAY"
    },
    {
      id: "Springfield Twp - MER",
      text: "Springfield Twp - MER"
    },
    {
      id: "Springhill Twp",
      text: "Springhill Twp"
    },
    {
      id: "Squirrel Hill",
      text: "Squirrel Hill"
    },
    {
      id: "St Clair Twp",
      text: "St Clair Twp"
    },
    {
      id: "St. Petersburg",
      text: "St. Petersburg"
    },
    {
      id: "Stanton Heights",
      text: "Stanton Heights"
    },
    {
      id: "Stewart Twp",
      text: "Stewart Twp"
    },
    {
      id: "Sth Versailles Twp",
      text: "Sth Versailles Twp"
    },
    {
      id: "Stonycreek Twp",
      text: "Stonycreek Twp"
    },
    {
      id: "Stowe Twp",
      text: "Stowe Twp"
    },
    {
      id: "Stoystown Boro",
      text: "Stoystown Boro"
    },
    {
      id: "Sugar Grove Twp",
      text: "Sugar Grove Twp"
    },
    {
      id: "Sugarcreek Twp",
      text: "Sugarcreek Twp"
    },
    {
      id: "Summer Hill",
      text: "Summer Hill"
    },
    {
      id: "Summit Twp - BUT",
      text: "Summit Twp - BUT"
    },
    {
      id: "Summit Twp - ERI",
      text: "Summit Twp - ERI"
    },
    {
      id: "Summit Twp - SOM",
      text: "Summit Twp - SOM"
    },
    {
      id: "Taylor Twp",
      text: "Taylor Twp"
    },
    {
      id: "Troy Hill",
      text: "Troy Hill"
    },
    {
      id: "Turtle Creek",
      text: "Turtle Creek"
    },
    {
      id: "Twp of But NE",
      text: "Twp of But NE"
    },
    {
      id: "Twp of But NW",
      text: "Twp of But NW"
    },
    {
      id: "Twp of But SE",
      text: "Twp of But SE"
    },
    {
      id: "Twp of But SW",
      text: "Twp of But SW"
    },
    {
      id: "Union City Borough",
      text: "Union City Borough"
    },
    {
      id: "Union Twp - LAW",
      text: "Union Twp - LAW"
    },
    {
      id: "Union Twp - WSH",
      text: "Union Twp - WSH"
    },
    {
      id: "Union Twp-CRA",
      text: "Union Twp-CRA"
    },
    {
      id: "Unity Twp",
      text: "Unity Twp"
    },
    {
      id: "Upper Burrell",
      text: "Upper Burrell"
    },
    {
      id: "Upper St. Clair",
      text: "Upper St. Clair"
    },
    {
      id: "Upper Turkeyfoot Twp",
      text: "Upper Turkeyfoot Twp"
    },
    {
      id: "Upper Tyrone Twp",
      text: "Upper Tyrone Twp"
    },
    {
      id: "Valencia Boro",
      text: "Valencia Boro"
    },
    {
      id: "Valley Twp",
      text: "Valley Twp"
    },
    {
      id: "Vandergrift - WML",
      text: "Vandergrift - WML"
    },
    {
      id: "Vandergrift Boro - ARM",
      text: "Vandergrift Boro - ARM"
    },
    {
      id: "Venango Twp",
      text: "Venango Twp"
    },
    {
      id: "Vernon Twp",
      text: "Vernon Twp"
    },
    {
      id: "Versailles Boro",
      text: "Versailles Boro"
    },
    {
      id: "Victory Twp",
      text: "Victory Twp"
    },
    {
      id: "W Brownsville",
      text: "W Brownsville"
    },
    {
      id: "W Kittanning Boro",
      text: "W Kittanning Boro"
    },
    {
      id: "W Leechburg",
      text: "W Leechburg"
    },
    {
      id: "W Middletown",
      text: "W Middletown"
    },
    {
      id: "W Pike Run Twp",
      text: "W Pike Run Twp"
    },
    {
      id: "W N Mahoning Twps",
      text: "W N Mahoning Twps"
    },
    {
      id: "Wall Boro",
      text: "Wall Boro"
    },
    {
      id: "Washingtn Ruff Creek",
      text: "Washingtn Ruff Creek"
    },
    {
      id: "Washington Twp",
      text: "Washington Twp"
    },
    {
      id: "Washington Twp - ARM",
      text: "Washington Twp - ARM"
    },
    {
      id: "Washington Twp - BUT",
      text: "Washington Twp - BUT"
    },
    {
      id: "Washington Twp - FAY",
      text: "Washington Twp - FAY"
    },
    {
      id: "Washington Twp - WML",
      text: "Washington Twp - WML"
    },
    {
      id: "Washington's Landing",
      text: "Washington's Landing"
    },
    {
      id: "Wayne Twp",
      text: "Wayne Twp"
    },
    {
      id: "Wayne Twp - ARM",
      text: "Wayne Twp - ARM"
    },
    {
      id: "Wayne Twp - CRA",
      text: "Wayne Twp - CRA"
    },
    {
      id: "Wayne Twp - LAW",
      text: "Wayne Twp - LAW"
    },
    {
      id: "Waynsbrg Frankln Twp",
      text: "Waynsbrg Frankln Twp"
    },
    {
      id: "Wellersburg Boro",
      text: "Wellersburg Boro"
    },
    {
      id: "Wentlings Corner",
      text: "Wentlings Corner"
    },
    {
      id: "Wesleyville Boro",
      text: "Wesleyville Boro"
    },
    {
      id: "West Alexander",
      text: "West Alexander"
    },
    {
      id: "West Bethlehem",
      text: "West Bethlehem"
    },
    {
      id: "West Branch Area School District",
      text: "West Branch Area School District"
    },
    {
      id: "West Deer",
      text: "West Deer"
    },
    {
      id: "West Elizabeth",
      text: "West Elizabeth"
    },
    {
      id: "West End",
      text: "West End"
    },
    {
      id: "West Finley",
      text: "West Finley"
    },
    {
      id: "West Franklin",
      text: "West Franklin"
    },
    {
      id: "West Homestead",
      text: "West Homestead"
    },
    {
      id: "West Mayfield",
      text: "West Mayfield"
    },
    {
      id: "West Mead Twp",
      text: "West Mead Twp"
    },
    {
      id: "West Middlesex Boro",
      text: "West Middlesex Boro"
    },
    {
      id: "West Mifflin",
      text: "West Mifflin"
    },
    {
      id: "West Newton",
      text: "West Newton"
    },
    {
      id: "West Salem Twp",
      text: "West Salem Twp"
    },
    {
      id: "West Sunbury",
      text: "West Sunbury"
    },
    {
      id: "West View",
      text: "West View"
    },
    {
      id: "West-Other Area",
      text: "West-Other Area"
    },
    {
      id: "Westmont Hilltop School District",
      text: "Westmont Hilltop School District"
    },
    {
      id: "Wharton Twp",
      text: "Wharton Twp"
    },
    {
      id: "White Oak",
      text: "White Oak"
    },
    {
      id: "White Twp - BEA",
      text: "White Twp - BEA"
    },
    {
      id: "White Twp - IND",
      text: "White Twp - IND"
    },
    {
      id: "Wilkins Twp",
      text: "Wilkins Twp"
    },
    {
      id: "Wilmington Twp",
      text: "Wilmington Twp"
    },
    {
      id: "Wind Ridge",
      text: "Wind Ridge"
    },
    {
      id: "Windber Area School District",
      text: "Windber Area School District"
    },
    {
      id: "Winfield Twp",
      text: "Winfield Twp"
    },
    {
      id: "Wolf Creek Twp",
      text: "Wolf Creek Twp"
    },
    {
      id: "Woods Run",
      text: "Woods Run"
    },
    {
      id: "Worth Twp - BUT",
      text: "Worth Twp - BUT"
    },
    {
      id: "Worth Twp - MER",
      text: "Worth Twp - MER"
    },
    {
      id: "Worthington Borough",
      text: "Worthington Borough"
    },
    {
      id: "Zelienople Boro",
      text: "Zelienople Boro"
    }
  ];

  /* HOME PAGE SEARCH */
  if (idx("#initiateSearch").length) {
    idx("#initiateSearch").on("click", function(event) {
      event.preventDefault();
      var url = window.location.href;
      history.pushState(null, "", url);

      let hrefBase = "http://cardo.idxbroker.com/idx/results/listings?";

      let searchTerm = idx("#searchField")
        .val()
        .trim()
        .toLowerCase();

      let isnum = /^\d+$/.test(searchTerm);

      let isCounty = countyIdMap.hasOwnProperty(searchTerm);

      let isNeighborhood = false;
      let targetNeighborhood;
      neighborhoodMap.forEach(function(item) {
        if (item.id.toLowerCase() == searchTerm) {
          isNeighborhood = true;
          targetNeighborhood = item.id.toLowerCase().replace(/\s/g, "+");
        }
      });

      let searchTermLength = searchTerm.length;

      if (isnum && searchTermLength == 5) {
        let fullHref =
          hrefBase + "pt=sfr&ccz=zipcode&zipcode%5B%5D=" + searchTerm;
        window.location.replace(fullHref);
      } else if (isnum && searchTermLength === 7) {
        let fullHref =
          hrefBase +
          "csv_listingID=" +
          searchTerm +
          "&a_statusCategory%5B%5D=active&a_statusCategory%5B%5D=sold";
        window.location.replace(fullHref);
      } else if (isCounty) {
        let fullHref =
          hrefBase +
          "pt=sfr&ccz=county&county%5B%5D=" +
          countyIdMap[searchTerm];
        window.location.replace(fullHref);
      } else if (isNeighborhood) {
        let fullHref =
          hrefBase +
          "idxID=d504&pt=1&a_mlsareaminor%5B%5D=" +
          targetNeighborhood;
        window.location.replace(fullHref);
      } else {
        console.log("THE ELSE");
      }

      console.log(neighborhoodMap.length);
    });
  }
  /* END OF HOME PAGE SEARCH */

  /* CONTACT FORM */
  idx(".mat-form").on("click", function(event) {
    event.stopPropagation();
  });

  idx(".detailsWrapper--right").on("click", function() {
    if (idx(".detailsWrapper--right").hasClass("open")) {
      idx(".detailsWrapper--right").removeClass("open");
    }
  });

  idx(".contact-mail").on("click", function() {
    if (idx(".detailsWrapper--right").hasClass("open")) {
      idx(".detailsWrapper--right").removeClass("open");
    } else {
      idx(".detailsWrapper--right").addClass("open");
    }
  });

  if (idx(".mat-form").length) {

    let isNameValid, isLastNameValid, isEmailValid, isPhoneValid;


    idx("#cfc_name").on("keyup", function() {
      if ( idx(this).val().match(/^[a-zA-Z]{3,16}$/) ) {

        isNameValid = true;
        idx("#cfc_name").css('border-color', 'green');

      } else {
        isNameValid = false;
        idx("#cfc_name").css('border-color', 'red');

      }
    });
    idx("#cfc_last_name").on("keyup", function() {
      if ( idx(this).val().match(/^[a-zA-Z]{3,16}$/) ) {

        isLastNameValid = true;
        idx("#cfc_last_name").css('border-color', 'green');

      } else {
        isLastNameValid = false;
        idx("#cfc_last_name").css('border-color', 'red');
      }
    });

    idx("#cfc_email").on("keyup", function() {
      if ( idx(this).val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {

        isEmailValid = true;
        idx("#cfc_email").css('border-color', 'green');

      } else {
        isEmailValid = false;
        idx("#cfc_email").css('border-color', 'red');
      }
    });

    idx("#cfc_phone").on("keyup", function() {
      if ( idx(this).val().match(/^([2-9][0-9]{2}[\-]{0,1}){2}[0-9]{4}$/) ) {

        isPhoneValid = true;
        idx("#cfc_phone").css('border-color', 'green');

      } else {
        isPhoneValid = false;
        idx("#cfc_phone").css('border-color', 'red');
      }
    });

    idx("#sendContactForm").on("click", function(event) {
      event.preventDefault();
      let name = idx("#cfc_name")
        .val()
        .trim();
      let lastName = idx("#cfc_last_name")
        .val()
        .trim();
      let email = idx("#cfc_email")
        .val()
        .trim();
      let phone = idx("#cfc_phone")
        .val()
        .trim();
      let requestInfo = idx("#cfc_request_info").is(":checked");
      let message = idx("#contactCustomMessage")
        .val()
        .trim();

      let listingID, data;
      if (idx("#listingIdHidden").length) {
        
        listingID = idx("#listingIdHidden").val();

        data = {
          name: name,
          lastName: lastName,
          email: email,
          phone: phone,
          requestInfo: requestInfo,
          message: message,
          listingID: listingID
        };
  
      } else {
        data = {
          name: name,
          lastName: lastName,
          email: email,
          phone: phone,
          requestInfo: requestInfo,
          message: message
        };
  
      }

      if (isNameValid && isLastNameValid && isEmailValid && isPhoneValid) {

        idx.ajax({
          url: "https://rethink-dev.herokuapp.com/api/sales/idx_lead",
          type: "post",
          //dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(data),

          success: function(data) {
            window.location.replace("http://cardo.tech");
          }
        })
        .done(function() {
          location.reload();
        });

      }
      
    });
  }

  /*CHECKBOX MSG COMPONENT*/
  idx(function() {
    idx("#clickCustomMessage").on("click", function() {
      var isChecked = idx("#sendCustomMessage").is(":checked");
      if (isChecked) {
        idx("#customMessageContainer").addClass("open");
      } else {
        idx("#customMessageContainer").removeClass("open");
      }
    });
    /*END OF CHECKBOX MSG COMPONENT*/
  });
  /* END OF CONTACT FORM */
});

if (idx(".menu__toggler").length && idx(".menu").length) {
  const toggler = document.querySelector(".menu__toggler");
  const menu = document.querySelector(".menu");

  toggler.addEventListener("click", () => {
    toggler.classList.toggle("active");
    menu.classList.toggle("active");
  });
}

(function(i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

ga("create", "UA-46156385-1", "cssscript.com");
ga("send", "pageview");
