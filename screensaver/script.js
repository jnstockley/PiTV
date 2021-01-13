var city = "";
var state = "";
var localVersion = 0.8;
var openWeatherAPIKey = "";
var pexelAPIKey = "";
var newsAPIKey = "";
var stocksAPIKey = "";
var funfactsLocation = "";
var weatherLocation = "";
var dateTimeLocation = "";
var newsLocation = "";
var stocksLocation = "";
var symbols = [];

function kelvinToF(temp){
    return Math.round(((temp - 273.15) * 1.8) + 32);
}

function kelvinToC(temp){
    return Math.round(temp - 273.15);
}

function backgroundImage(){
    var url = "https://api.pexels.com/v1/search?query=nature&per_page=30"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader("Authorization", pexelAPIKey);
    xmlHttp.send();
    data = JSON.parse(xmlHttp.response);
    var photos = data["photos"];
    randNum = Math.floor(Math.random() * photos.length);
        if(randNum == 27){
            randNum = randNum + 1;
        }
        document.getElementById("background").src = photos[randNum]["src"]["large2x"];
        document.getElementById("background").style.height = "100%";
        document.getElementById("background").style.width = "100%";
    setInterval(function(){
        randNum = Math.floor(Math.random() * photos.length);
        if(randNum == 27){
            randNum = randNum + 1;
        }
        $("#background").fadeOut(300, function(){
            $(this).attr('src', photos[randNum]["src"]["large2x"]).bind('onreadystatechange load', function(){
                if (this.complete) $(this).fadeIn(300);
            })
        })
    }, 300000);
}

function dateTime(location){
    var months = {'1':'Jan', '2':'Feb', '3':'Mar', '4':'Apr', '5':'May', '6':'Jun', '7':'Jul', '8':'Aug', '9':'Sept', '10':'Oct', '11':'Nov', '12':'Dec'};
    let currDate = new Date();
    let day = currDate.getDate();
    let month = currDate.getMonth() + 1;
    let year = currDate.getFullYear();
    document.getElementById(location + "-line1").innerHTML = months[month] + " " + day + ", " + year;
    let hour = currDate.getHours();
    let minute = currDate.getMinutes();
    let afternoon = "";
        if(hour/12 >= 1){
        hour = hour - 12;
        afternoon = " PM";
    }else{
        afternoon = " AM";
        }
    
    if(minute.toString().length == 1){
        minute = "0" + minute;
    }
    let time = hour + ":" + minute + afternoon;
    document.getElementById(location+ "-line2").innerHTML = time;
}

function funFacts(location){
    factsURL = "https://uselessfacts.jsph.pl/random.json?language=en";
    var factsAPI = new XMLHttpRequest();
    factsAPI.open("GET", factsURL, false);
    factsAPI.send();
    data = JSON.parse(factsAPI.response)["text"];
    document.getElementById(location + "-line1").innerHTML = data;
}

function weather(location, unit){
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=" + openWeatherAPIKey;
    var weatherAPI = new XMLHttpRequest();
    weatherAPI.open("GET", weatherURL, false);
    weatherAPI.send();
    data = JSON.parse(weatherAPI.response);
    if(unit == "F" || unit == "f"){
        temp = kelvinToF(data["main"]["temp"]);
        temp = temp + ' &#176;' + "F";
    }else if(unit == "C" || unit == "c"){
        temp = kelvinToC(data["main"]["temp"]);
        temp = temp + ' &#176;' + "C"
    }else{
        temp = Math.round(((data["main"]["temp"] - 273.15) * 1.8) + 32);
        temp = temp + ' &#176;' + "F";
    }
    weather = data["weather"][0]["main"]
    weatherIcon = "https://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + ".png";
    document.getElementById(location + "-line1").innerHTML = temp;
    document.getElementById(location + "-line2").innerHTML = weather;
    document.getElementById(location + "-img").src = weatherIcon;
    setInterval(function(){
        weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=" + openWeatherAPIKey;
        var weatherAPI = new XMLHttpRequest();
        weatherAPI.open("GET", weatherURL, false);
        weatherAPI.send();
        data = JSON.parse(weatherAPI.response);
        if(unit == "F" || unit == "f"){
            temp = kelvinToF(data["main"]["temp"]);
            temp = temp + ' &#176;' + "F";
        }else if(unit == "C" || unit == "c"){
            temp = kelvinToC(data["main"]["temp"]);
            temp = temp + ' &#176;' + "C"
        }else{
            temp = Math.round(((data["main"]["temp"] - 273.15) * 1.8) + 32);
            temp = temp + ' &#176;' + "F";
        }
        weather = data["weather"][0]["main"]
        weatherIcon = "https://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + ".png";
        document.getElementById(location + "-line1").innerHTML = temp;
        document.getElementById(location + "-line2").innerHTML = weather;
        document.getElementById(location + "-img").src = weatherIcon;
    }, 600000);
    
}

function news(location){
    var newsURL = "https://newsapi.org/v2/top-headlines?country=us&apiKey="+ newsAPIKey;
    var newsAPI = new XMLHttpRequest();
    newsAPI.open("GET", newsURL, false);
    newsAPI.send();
    var data = JSON.parse(newsAPI.response)["articles"];
    randNum = Math.floor(Math.random() * data.length);
    var title = data[randNum]["title"]
    if(title.includes(" - ")){
        title = title.slice(0, title.indexOf(' - '))
    }
    if(location == "bottomRight"){
        document.getElementById(location+"-line1").innerHTML = title;
        document.getElementById(location+"-line2").innerHTML = "Source: " + data[randNum]["source"]["name"]
    }else{
        document.getElementById(location+"-line1").innerHTML = title + '<br>' + "Source: " + data[randNum]["source"]["name"];
    }
    setInterval(function(){
        randNum = Math.floor(Math.random() * data.length);
        var title = data[randNum]["title"]
        if(title.includes(" - ")){
            title = title.slice(0, title.indexOf(' - '))
        }
        if(location == "bottomRight"){
        document.getElementById(location+"-line1").innerHTML = title;
        document.getElementById(location+"-line2").innerHTML = "Source: " + data[randNum]["source"]["name"]
    }else{
        document.getElementById(location+"-line1").innerHTML = title + '<br>' + "Source: " + data[randNum]["source"]["name"];
    }
    }, 120000);
}

function stocks(location){
    var stocksData = ""
    for(var i=0 ; i<symbols.length; i++){
        var stocksURL = "https://finnhub.io/api/v1/quote?symbol=" + symbols[i] + "&token="+stocksAPIKey;
        var stocksAPI = new XMLHttpRequest();
        stocksAPI.open("GET", stocksURL, false);
        stocksAPI.send();
        var data = JSON.parse(stocksAPI.response)['c']
        if(data.toString().slice(data.toString().indexOf(".")+1).length==1){
            data = data + '0';
        }
        stocksData = stocksData + symbols[i] + ": $" + data + '<br>'
    }
    document.getElementById(location+'-line1').innerHTML = stocksData;
}

function update(){
    updateURL = "https://raw.githubusercontent.com/jnstockley/PiTV/master/version.txt";
    var updater = new XMLHttpRequest();
    updater.open("GET", updateURL, false);
    updater.send();
    var serverVersion = updater.response;
    if(serverVersion > localVersion){
        //TODO Make better way to inform update
        document.getElementById("message").innerHTML = "Update for PiTV is available! Please run the update script from https://github.com/jnstockley/PiTV"
        document.getElementById("message").style.visibility = "visible";
        //alert("Please Update PiTV!")
    }
}

function init(){
    tempUnit = "";
    var settings = new XMLHttpRequest();
    settings.open("GET", "http://localhost/screensaver/settings.json", false);
    settings.send();
    data = JSON.parse(settings.response);
    pexelAPIKey = data["keys"]["pexels"];
    city = data["weather"]["city"];
    state = data["weather"]["state"];
    tempUnit = data["weather"]["tempUnit"];
    openWeatherAPIKey = data["keys"]["openweather"];
    newsAPIKey = data["keys"]["news"]
    stocksAPIKey = data["keys"]["stocks"]
    symbols = data["stocks"]
    funfactsLocation = data["sections"]["funfacts"]
    weatherLocation = data["sections"]["weather"]
    dateTimeLocation = data["sections"]["dateTime"]
    newsLocation = data["sections"]["news"]
    stocksLocation = data["sections"]["stocks"]
    if(pexelAPIKey == "PEXELS_API_KEY"){
        document.getElementById("message").innerHTML = "Unable to find pexels API key. To get background images to work please add a pexels API key to settings.json"
        document.getElementById("message").style.visibility = "visible";
    }else{
        backgroundImage();
    }
    if(openWeatherAPIKey == "OPENWEATHER_API_KEY" && weatherLocation!="none"){
        document.getElementById(weatherLocation+"-line1").innerHTML = "Unable to find openweather API Key";
        document.getElementById(weatherLocation+"-line2").innerHTML = "To get weather to work please add an openweather API key to settings.json"
    }else if(weatherLocation!="none"){
        if(city == "CITY_NAME" || state == "STATE_NAME"){
            document.getElementById(weatherLocation+"-line1").innerHTML = "City or State name is inncorrect.";
            document.getElementById(weatherLocation+"-line2").innerHTML = "Please change city or state in settings.json"
        }else{
            weather(weatherLocation, tempUnit);
        }
    }
    if(newsAPIKey == "NEWS_API_KEY" && newsLocation!="none"){
        document.getElementById(newsLocation+"-line1").innerHTML = "Unable to find New API Key";
        document.getElementById(newsLocation+"-line2").innerHTML = "To gets news to work please add a newsapi.org API key to settings.json"
    }else if(newsLocation!="none"){
        news(newsLocation);
        setInterval(function(){
            news(newsLocation);
        }, 1800000);
    }
    if(stocksAPIKey == "STOCKS_API_KEY" && stocksLocation!="none"){
        document.getElementById(stocksLocation+"-line1").innerHTML = "Unable to find Stocks API Key";
        document.getElementById(stocksLocation+"-line2").innerHTML = "To gets stocks to work please add a finnhub.io API key to settings.json"
        console.log("No Stocks API")
    }else if(stocksLocation!="none"){
        if(symbols.length==0){
            document.getElementById(stocksLocation+"-line1").innerHTML = "To get stocks to work, please add stock tickers to stocks list in settings.json"
        }else{
            stocks(stocksLocation);
            setInterval(function(){
                stocks(stocksLocation);
            }, 60000);
        }
    }
    if(funfactsLocation!="none"){
        funFacts(funfactsLocation);
        setInterval(function() {
            funFacts(funfactsLocation);
        }, 600000);    
    }if(dateTimeLocation!="none"){
        dateTime(dateTimeLocation);
        setInterval(function(){
            dateTime(dateTimeLocation);
        }, 10);
    }
    update();
    setInterval(function(){
        update();
    }, 3600000);
}
