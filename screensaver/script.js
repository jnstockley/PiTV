var city = "";
var state = ""

var url = "https://api.pexels.com/v1/search?query=nature&per_page=30"
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, false);
xmlHttp.setRequestHeader("Authorization", "563492ad6f91700001000001e19d7046d3a641b0a90622a78e8931cf");
xmlHttp.send();
data = JSON.parse(xmlHttp.response);
var photos = data["photos"];
randNum = Math.floor(Math.random() * photos.length);
document.getElementById("background").src = photos[randNum]["src"]["large2x"];
document.getElementById("background").style.height = "100%";
document.getElementById("background").style.width = "100%";
setInterval(function() {
    randNum = Math.floor(Math.random() * photos.length);
    document.getElementById("background").src = photos[randNum]["src"]["large2x"];
    document.getElementById("background").style.height = "100%";
    document.getElementById("background").style.width = "100%";
}, 300000);

setInterval(function() {
    var months = {'1':'Jan', '2':'Feb', '3':'Mar', '4':'Apr', '5':'May', '6':'Jun', '7':'Jul', '8':'Aug', '9':'Sept', '10':'Oct', '11':'Nov', '12':'Dec'};
    let currDate = new Date();
    let day = currDate.getDate();
    let month = currDate.getMonth() + 1;
    let year = currDate.getFullYear();
    document.getElementById("date").innerHTML = months[month] + " " + day + ", " + year;
    let hour = currDate.getHours();
    let minute = currDate.getMinutes();
    let afternoon = "";
    if(hour%12 == 1){
        hour = hour - 12;
        afternoon = " PM";
    }else{
        afternoon = " AM";
    }
    if(minute%9 < 0){
        minute = "0" + minute;
    }
    let time = hour + ":" + minute + afternoon;
    document.getElementById("time").innerHTML = time;
}, 10)

factsURL = "https://uselessfacts.jsph.pl/random.json?language=en";
var factsAPI = new XMLHttpRequest();
factsAPI.open("GET", factsURL, false);
factsAPI.send();
data = JSON.parse(factsAPI.response)["text"];
document.getElementById("factText").innerHTML = data;
setInterval(function() {
    factsURL = "https://uselessfacts.jsph.pl/random.json?language=en";
    var factsAPI = new XMLHttpRequest();
    factsAPI.open("GET", factsURL, false);
    factsAPI.send();
    data = JSON.parse(factsAPI.response)["text"];
    document.getElementById("factText").innerHTML = data;
}, 600000);
function weather(){
weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=2611a10164b70771188e3dc096380c10";
var weatherAPI = new XMLHttpRequest();
weatherAPI.open("GET", weatherURL, false);
weatherAPI.send();
data = JSON.parse(weatherAPI.response);
temp = Math.round(((data["main"]["temp"] - 273.15) * 1.8) + 32);
weather = data["weather"][0]["main"]
weatherIcon = "http://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + ".png";
document.getElementById("temp").innerHTML = temp + ' &#176;' + "F"
document.getElementById("weatherName").innerHTML = weather;
document.getElementById("weatherIcon").src = weatherIcon;
setInterval(function() {
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=2611a10164b70771188e3dc096380c10";
    var weatherAPI = new XMLHttpRequest();
    weatherAPI.open("GET", weatherURL, false);
    weatherAPI.send();
    data = JSON.parse(weatherAPI.response);
    temp = Math.round(((data["main"]["temp"] - 273.15) * 1.8) + 32);
    weather = data["weather"][0]["main"]
    weatherIcon = "http://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + ".png";
    document.getElementById("temp").innerHTML = temp + ' &#176;' + "F"
    document.getElementById("weatherName").innerHTML = weather;
    document.getElementById("weatherIcon").src = weatherIcon;
},1800000)
}

function init(){
    var settings = new XMLHttpRequest();
    settings.onreadystatechange = reportStatus;
    settings.open("GET", "http://localhost/settings.json", true);
    settings.send();
    function reportStatus(){
        if(settings.readyState == 4){
            data = JSON.parse(this.response);
            city = data["city"];
            state = data["state"];
           weather();
        }
    }
}
