var city = "";
var state = ""
var localVersion = 0.75;
var openWeatherAPIKey = "";
var pexelAPIKey = ""

function kelvinToF(temp){
    return Math.round(((temp - 273.15) * 1.8) + 32);
}

function kelvinToC(temp){
    return Math.round(temp - 273.15);
}

function test(){
    $()
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

function dateTime(){
    var months = {'1':'Jan', '2':'Feb', '3':'Mar', '4':'Apr', '5':'May', '6':'Jun', '7':'Jul', '8':'Aug', '9':'Sept', '10':'Oct', '11':'Nov', '12':'Dec'};
    let currDate = new Date();
    let day = currDate.getDate();
    let month = currDate.getMonth() + 1;
    let year = currDate.getFullYear();
    document.getElementById("date").innerHTML = months[month] + " " + day + ", " + year;
    let hour = currDate.getHours();
    let minute = currDate.getMinutes();
    let afternoon = "";
        if(hour%12 >= 1){
        hour = hour - 12;
        afternoon = " PM";
    }else{
        afternoon = " AM";
        }
    
    if(minute.toString().length == 1){
        minute = "0" + minute;
    }
    let time = hour + ":" + minute + afternoon;
    document.getElementById("time").innerHTML = time;
}

function funFacts(){
    factsURL = "https://uselessfacts.jsph.pl/random.json?language=en";
    var factsAPI = new XMLHttpRequest();
    factsAPI.open("GET", factsURL, false);
    factsAPI.send();
    data = JSON.parse(factsAPI.response)["text"];
    document.getElementById("factText").innerHTML = data;
}

function weather(unit){
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
}   else{
        temp = Math.round(((data["main"]["temp"] - 273.15) * 1.8) + 32);
        temp = temp + ' &#176;' + "F";
    }
    weather = data["weather"][0]["main"]
    weatherIcon = "https://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + ".png";
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("weatherName").innerHTML = weather;
    document.getElementById("weatherIcon").src = weatherIcon;
}

function update(){
    updateURL = "https://raw.githubusercontent.com/jnstockley/PiTV/master/version.txt";
    var updater = new XMLHttpRequest();
    updater.open("GET", updateURL, false);
    updater.send();
    var serverVersion = updater.response;
    if(serverVersion > localVersion){
        alert("Please Update PiTV!")
    }
}

function init(){
    tempUnit = "";
    var settings = new XMLHttpRequest();
    settings.open("GET", "http://localhost/screensaver/settings.json", false);
    settings.send();
    data = JSON.parse(settings.response);
    pexelAPIKey = data["keys"]["pexels"];
    city = data["city"];
    state = data["state"];
    tempUnit = data["tempUnit"];
    openWeatherAPIKey = data["keys"]["openweather"];
    weather(tempUnit);
    update();
    backgroundImage();
    dateTime();
    funFacts();
    setInterval(function(){
        dateTime();
    }, 10);
    setInterval(function() {
        funFacts();
    }, 600000);
    setInterval(function(){
        updater();
    }, 3600000);
    setInterval(function(){
        weather(tempUnit);
    }, 600000)
    
}
