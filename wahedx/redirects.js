// geotargetly_continent_name(); //gets visitor continent name
// geotargetly_continent_code(); //gets visitor continent code
// geotargetly_country_name(); //gets visitor country name
// geotargetly_country_code(); //gets visitor country code
// geotargetly_region_name(); //gets visitor Region/State or state name
// geotargetly_region_code(); //gets visitor Region/State or state code
// geotargetly_city_name(); // gets visitor city name
// geotargetly_lat(); // gets visitor latitude
// geotargetly_lng(); // gets visitor longitude 
// geotargetly_ip(); // gets visitor IP address
// geotargetly_currency_code(); // gets visitor currency code
// geotargetly_currency_symbol(); // gets visitor currency symbol
// geotargetly_calling_code(); // gets visitor calling code
// geotargetly_loaded(); // gets called when data is available

// We are using Geotargetly Location

(function(g,e,o,t,a,r,ge,tl,y){
    t=g.getElementsByTagName(e)[0];y=g.createElement(e);y.async=true;
    y.src='https://g1386590346.co/gl?id=-NlMlgHDHcE4nTv78MUX&refurl='+g.referrer+'&winurl='+encodeURIComponent(window.location);
    t.parentNode.insertBefore(y,t);
    })(document,'script');

function geotargetly_loaded() {
    var country_name = geotargetly_country_name();
    console.log("Detected country:", country_name);

    // Check if the country name is "United States"
    if (country_name === "United States") {
        console.log("Redirecting to US-specific page");
        window.location.href = "https://www.wahed.com/ventures";
    } else {
        console.log("Redirecting to UK-specific page for non-US visitors");
        window.location.href = "https://www.wahed.com/uk/ventures";
    }
}